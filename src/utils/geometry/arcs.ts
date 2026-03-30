import { GeometryHitResult, getActiveObjects } from './types';

// ============================================================================
// Arc / Cone Detection
// ============================================================================
// An "arc" is a pie-slice or cone shape fanning out from a point.
// Think of it like a flashlight beam or a sword swing area.
//
//         * * *           <- outer edge (maxDistance away)
//       *   |   *
//      *    |    *        The "|" is the direction you're facing.
//       *   |   *         The "*" marks the edges of the arc.
//         * * *
//           O             <- origin (your character)
//
// "arcWidth" controls how wide the cone opens (in radians).
// Use the ArcWidths presets: NARROW (30°), MEDIUM (45°), WIDE (90°), etc.
// ============================================================================


/**
 * Checks if a single point is inside an arc/cone shape.
 * 
 * HOW IT WORKS:
 * 1. First checks if the point is close enough (within maxDistance)
 * 2. Then checks if the point is within the cone angle
 * 
 * @param originX       Where the arc starts (your character's X)
 * @param originY       Where the arc starts (your character's Y)
 * @param pointX        The point to test (enemy X)
 * @param pointY        The point to test (enemy Y)
 * @param direction     Which way the arc faces (radians - use Phaser.Math.Angle.Between)
 * @param arcWidth      How wide the cone opens (radians - use ArcWidths.WIDE etc)
 * @param maxDistance    How far the arc reaches (pixels)
 */
export function isInArc(
    originX: number,
    originY: number,
    pointX: number,
    pointY: number,
    direction: number,
    arcWidth: number,
    maxDistance: number
): boolean {
    // Step 1: Is the point close enough?
    const distanceToPoint = Phaser.Math.Distance.Between(originX, originY, pointX, pointY);
    if (distanceToPoint > maxDistance) return false;

    // Step 2: Is the point within the cone angle?
    // Get the angle from origin to the point
    const angleToPoint = Phaser.Math.Angle.Between(originX, originY, pointX, pointY);
    // Find how far off-center the point is from where we're facing
    const angleDifference = Phaser.Math.Angle.Wrap(angleToPoint - direction);

    // If the angle difference is within half the arc width, it's inside the cone
    return Math.abs(angleDifference) <= arcWidth / 2;
}


/**
 * Finds all objects from a group that are within an arc/cone shape.
 * Great for sword swings and cone-shaped abilities.
 * 
 * EXAMPLE (90° sword swing, 48px reach):
 *   const hits = getObjectsInArc(
 *       new Phaser.Math.Vector2(player.x, player.y),
 *       angleToMouse,        // direction to face
 *       ArcWidths.WIDE,      // 90° cone
 *       48,                  // range in pixels
 *       scene.Enemies
 *   );
 * 
 * @param origin         Where the arc starts (character position)
 * @param direction      Which way the arc faces (radians)
 * @param arcWidth       How wide the cone opens (radians)
 * @param maxDistance    How far the arc reaches (pixels)
 * @param group          The Phaser group of objects to check (e.g. scene.Enemies)
 * @param sortByDistance  If true, closest objects come first in the results
 */
export function getObjectsInArc<T extends Phaser.GameObjects.GameObject & { x: number; y: number }>(
    origin: Phaser.Math.Vector2,
    direction: number,
    arcWidth: number,
    maxDistance: number,
    group: Phaser.GameObjects.Group,
    sortByDistance: boolean = false
): GeometryHitResult<T>[] {
    const results: GeometryHitResult<T>[] = [];

    for (const gameObj of getActiveObjects<T>(group)) {
        // How far is this object?
        const distance = Phaser.Math.Distance.Between(origin.x, origin.y, gameObj.x, gameObj.y);
        if (distance > maxDistance) continue;

        // What angle is this object at, relative to our facing direction?
        const angle = Phaser.Math.Angle.Between(origin.x, origin.y, gameObj.x, gameObj.y);
        const angleDifference = Phaser.Math.Angle.Wrap(angle - direction);

        // Is it within the cone?
        if (Math.abs(angleDifference) <= arcWidth / 2) {
            results.push({ object: gameObj, distance, angle });
        }
    }

    if (sortByDistance) {
        results.sort((a, b) => a.distance - b.distance);
    }

    return results;
}


/**
 * Same as getObjectsInArc, but uses the Arcade physics quadtree for better
 * performance when there are many objects in the scene.
 * 
 * The quadtree quickly narrows down which objects are nearby, then we do
 * the precise angle check only on those candidates.
 * 
 * @param scene        The current Phaser scene
 * @param origin       Where the arc starts
 * @param direction    Which way the arc faces (radians)
 * @param arcWidth     How wide the cone opens (radians)
 * @param maxDistance   How far the arc reaches (pixels)
 * @param filterFn     Optional: only include objects that pass this test
 */
export function getPhysicsBodiesInArc(
    scene: Phaser.Scene,
    origin: Phaser.Math.Vector2,
    direction: number,
    arcWidth: number,
    maxDistance: number,
    filterFn?: (obj: Phaser.GameObjects.GameObject) => boolean
): (Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody)[] {
    // Step 1: Quick circle check using the physics engine's quadtree
    // This is fast - it only returns objects that are roughly nearby
    const nearbyCandidates = scene.physics.overlapCirc(origin.x, origin.y, maxDistance, true, true);

    // Step 2: Now do the precise angle check on just the nearby ones
    return nearbyCandidates.filter((body) => {
        const obj = body.gameObject;
        if (!obj || !obj.active) return false;
        if (filterFn && !filterFn(obj)) return false;

        const angle = Phaser.Math.Angle.Between(origin.x, origin.y, body.center.x, body.center.y);
        const angleDifference = Phaser.Math.Angle.Wrap(angle - direction);

        return Math.abs(angleDifference) <= arcWidth / 2;
    });
}


/**
 * Checks if a point is within a "sector" (a donut-slice shape).
 * This is like an arc, but with a minimum distance too — so there's a
 * hole in the middle. Useful for ring-shaped AOE or abilities that
 * only hit at a certain range.
 * 
 *      * * * *
 *    *  . . .  *        <- outer ring (maxDistance)
 *   *  .     .  *
 *    *  . . .  *        <- inner ring (minDistance)
 *      * * * *
 *         O             <- origin
 * 
 * @param originX      Where the sector starts (X)
 * @param originY      Where the sector starts (Y)
 * @param pointX       The point to test (X)
 * @param pointY       The point to test (Y)
 * @param direction    Which way the sector faces (radians)
 * @param arcWidth     How wide the sector opens (radians)
 * @param minDistance   Inner radius — closer than this doesn't count
 * @param maxDistance   Outer radius — further than this doesn't count
 */
export function isInSector(
    originX: number,
    originY: number,
    pointX: number,
    pointY: number,
    direction: number,
    arcWidth: number,
    minDistance: number,
    maxDistance: number
): boolean {
    const dist = Phaser.Math.Distance.Between(originX, originY, pointX, pointY);

    // Must be between the inner and outer radius
    if (dist > maxDistance || dist < minDistance) return false;

    // Must be within the cone angle
    const angleToPoint = Phaser.Math.Angle.Between(originX, originY, pointX, pointY);
    const angleDifference = Phaser.Math.Angle.Wrap(angleToPoint - direction);

    return Math.abs(angleDifference) <= arcWidth / 2;
}


/**
 * A high-level helper for creating sword swing attacks.
 * Returns the parameters you'd pass to getObjectsInArc.
 * 
 * EXAMPLE:
 *   const swing = createSwordSwing(
 *       { origin: playerPos, direction: facingAngle, reach: 48 },
 *       ArcWidths.WIDE
 *   );
 *   const hits = getObjectsInArc(swing.origin, swing.direction, swing.arcWidth, swing.reach, enemies);
 */
export function createSwordSwing(
    config: { origin: Phaser.Math.Vector2; direction: number; reach: number },
    arcWidth: number
): { origin: Phaser.Math.Vector2; direction: number; arcWidth: number; reach: number } {
    return {
        origin: config.origin,
        direction: config.direction,
        arcWidth,
        reach: config.reach
    };
}
