import { getActiveObjects } from './types';

// ============================================================================
// Triangle Detection
// ============================================================================
// A triangle is useful for stab/thrust attacks and directional abilities.
// It has a narrow point (tip) and a wide end (base).
//
//          *                <- tip (furthest from character)
//         / \
//        /   \
//       /     \
//      *-------*            <- base (at the character, left & right)
//          O                <- origin (your character)
//
// "length"    = how far the tip reaches from the character
// "baseWidth" = how wide the base is (left-to-right at the character)
// ============================================================================


/**
 * Creates a triangle shape pointing away from the character.
 * The tip points in the facing direction, and the base sits at the origin.
 * 
 * EXAMPLE (stab attack, 60px long, 30px wide base):
 *   const triangle = createAttackTriangle(playerPos, facingAngle, 60, 30);
 *   const hits = getObjectsInTriangle(triangle, scene.Enemies);
 * 
 * @param origin      Where the character is standing
 * @param direction   Which way the triangle points (radians)
 * @param length      How far the tip reaches (pixels)
 * @param baseWidth   How wide the base is (pixels)
 */
export function createAttackTriangle(
    origin: Phaser.Math.Vector2,
    direction: number,
    length: number,
    baseWidth: number
): Phaser.Geom.Triangle {
    // The tip is at "length" pixels in the facing direction
    const tipX = origin.x + Math.cos(direction) * length;
    const tipY = origin.y + Math.sin(direction) * length;

    // The base sits at the origin, spread left and right perpendicular to the facing direction
    // "perpendicular" means rotated 90° from the facing direction
    const perpAngle = direction + Math.PI / 2;
    const halfBase = baseWidth / 2;

    const baseLeftX  = origin.x + Math.cos(perpAngle) * halfBase;
    const baseLeftY  = origin.y + Math.sin(perpAngle) * halfBase;

    const baseRightX = origin.x - Math.cos(perpAngle) * halfBase;
    const baseRightY = origin.y - Math.sin(perpAngle) * halfBase;

    return new Phaser.Geom.Triangle(
        tipX, tipY,
        baseLeftX, baseLeftY,
        baseRightX, baseRightY
    );
}


/**
 * Checks if a single point is inside a triangle.
 */
export function isInTriangle(
    triangle: Phaser.Geom.Triangle,
    pointX: number,
    pointY: number
): boolean {
    return Phaser.Geom.Triangle.Contains(triangle, pointX, pointY);
}


/**
 * Finds all objects from a group that are inside a triangle.
 * 
 * @param triangle   The triangle shape (use createAttackTriangle to make one)
 * @param group      Phaser group to check (e.g. scene.Enemies)
 */
export function getObjectsInTriangle<T extends Phaser.GameObjects.GameObject & { x: number; y: number }>(
    triangle: Phaser.Geom.Triangle,
    group: Phaser.GameObjects.Group
): T[] {
    return getActiveObjects<T>(group).filter(
        obj => Phaser.Geom.Triangle.Contains(triangle, obj.x, obj.y)
    );
}


/**
 * A high-level helper for creating thrust/stab attacks.
 * 
 * If width is 0, creates a simple line (infinitely thin thrust).
 * If width > 0, creates a triangle (wider stab area).
 * 
 * @param config   Where the character is and which way they're facing
 * @param width    How wide the thrust is (0 = line, >0 = triangle)
 */
export function createThrustAttack(
    config: { origin: Phaser.Math.Vector2; direction: number; reach: number },
    width: number = 0
): Phaser.Geom.Line | Phaser.Geom.Triangle {
    if (width <= 0) {
        // Thin line thrust
        const startX = config.origin.x;
        const startY = config.origin.y;
        const endX = startX + Math.cos(config.direction) * config.reach;
        const endY = startY + Math.sin(config.direction) * config.reach;
        return new Phaser.Geom.Line(startX, startY, endX, endY);
    }

    // Wider triangle thrust
    return createAttackTriangle(config.origin, config.direction, config.reach, width);
}
