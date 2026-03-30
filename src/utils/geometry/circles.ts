import { GeometryHitResult, getActiveObjects } from './types';

// ============================================================================
// Circle Detection
// ============================================================================
// A circle is the simplest area shape — just a center point and a radius.
// Great for: hammer slams, explosions, ground stomps, AOE abilities.
//
//        * * *
//      *       *
//     *    O    *    <- O is the center, * marks the edge
//      *       *
//        * * *
//
// "radius" = how big the circle is (in pixels from center to edge)
// ============================================================================


/**
 * Checks if a single point is inside a circle.
 * 
 * @param centerX   Center of the circle (X)
 * @param centerY   Center of the circle (Y)
 * @param pointX    The point to test (X)
 * @param pointY    The point to test (Y)
 * @param radius    How big the circle is (pixels)
 */
export function isInCircle(
    centerX: number,
    centerY: number,
    pointX: number,
    pointY: number,
    radius: number
): boolean {
    // Simple: if the distance from center to point is less than the radius, it's inside
    return Phaser.Math.Distance.Between(centerX, centerY, pointX, pointY) <= radius;
}


/**
 * Finds all objects from a group that are within a circle.
 * 
 * EXAMPLE (hammer slam, 24px radius at impact point):
 *   const hits = getObjectsInCircle(impactX, impactY, 24, scene.Enemies);
 * 
 * @param centerX         Center of the circle (X)
 * @param centerY         Center of the circle (Y)
 * @param radius          How big the circle is (pixels)
 * @param group           Phaser group to check (e.g. scene.Enemies)
 * @param sortByDistance   If true, closest objects come first
 */
export function getObjectsInCircle<T extends Phaser.GameObjects.GameObject & { x: number; y: number }>(
    centerX: number,
    centerY: number,
    radius: number,
    group: Phaser.GameObjects.Group,
    sortByDistance: boolean = false
): GeometryHitResult<T>[] {
    const results: GeometryHitResult<T>[] = [];

    for (const gameObj of getActiveObjects<T>(group)) {
        const distance = Phaser.Math.Distance.Between(centerX, centerY, gameObj.x, gameObj.y);

        if (distance <= radius) {
            const angle = Phaser.Math.Angle.Between(centerX, centerY, gameObj.x, gameObj.y);
            results.push({ object: gameObj, distance, angle });
        }
    }

    if (sortByDistance) {
        results.sort((a, b) => a.distance - b.distance);
    }

    return results;
}


/**
 * Finds enemies in a circle using a quadtree for better performance.
 * Uses bounding-box intersection (more accurate than center-point checks
 * since it accounts for enemy sprite size).
 * 
 * @param centerX          Center of the circle (X)
 * @param centerY          Center of the circle (Y)
 * @param radius           How big the circle is (pixels)
 * @param quadtree         Your quadtree instance
 * @param enemyRectClass   The EnemyRect class (for identifying enemies in the quadtree)
 * @param getBounds        A function that returns an enemy's bounding rectangle
 */
export function getEnemiesInCircleQuadtree<T, R extends { enemy: T }>(
    centerX: number,
    centerY: number,
    radius: number,
    quadtree: { retrieve: (rect: any) => any[] },
    enemyRectClass: new (...args: any[]) => R,
    getBounds: (enemy: T) => Phaser.Geom.Rectangle
): T[] {
    const circle = new Phaser.Geom.Circle(centerX, centerY, radius);

    // The quadtree works with rectangles, so we query using the circle's bounding box
    const queryRect = {
        x: centerX - radius,
        y: centerY - radius,
        width: radius * 2,
        height: radius * 2
    };

    // Get nearby candidates from quadtree, then do precise circle check
    return quadtree.retrieve(queryRect)
        .filter((el): el is R => el instanceof enemyRectClass)
        .filter(el => Phaser.Geom.Intersects.CircleToRectangle(circle, getBounds(el.enemy)))
        .map(el => el.enemy);
}


/**
 * A high-level helper for creating hammer slam attacks.
 * Calculates the impact point in front of the character.
 * 
 * EXAMPLE:
 *   const slam = createHammerSlam(
 *       { origin: playerPos, direction: facingAngle, reach: 32 },
 *       24   // impact radius
 *   );
 *   const hits = getObjectsInCircle(slam.center.x, slam.center.y, slam.radius, enemies);
 * 
 * @param config   Where the character is and which way they're facing
 * @param radius   How big the slam impact area is (pixels)
 */
export function createHammerSlam(
    config: { origin: Phaser.Math.Vector2; direction: number; reach: number },
    radius: number
): { center: Phaser.Math.Vector2; radius: number } {
    // The impact lands at "reach" pixels in front of the character
    const impactX = config.origin.x + Math.cos(config.direction) * config.reach;
    const impactY = config.origin.y + Math.sin(config.direction) * config.reach;

    return {
        center: new Phaser.Math.Vector2(impactX, impactY),
        radius
    };
}
