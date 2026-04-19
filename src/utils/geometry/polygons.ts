import { getActiveObjects } from './types';

// ============================================================================
// Polygon Detection
// ============================================================================
// Polygons are custom shapes made from a list of corner points.
// Use them when circles, arcs, and triangles don't quite fit your needs.
//
// Points are defined as OFFSETS from the origin. For example:
//   origin = (100, 100)
//   points = [[0, -20], [20, 20], [-20, 20]]
//   → creates a triangle at (100,80), (120,120), (80,120)
//
// You can also rotate the whole shape — useful for aiming abilities
// in different directions without recalculating every point.
// ============================================================================


/**
 * Creates a polygon from a list of offset points.
 * Each point is an [x, y] pair relative to the origin.
 * 
 * EXAMPLE (diamond shape around the player):
 *   const diamond = createPolygon(
 *       new Phaser.Math.Vector2(player.x, player.y),
 *       [[0, -30], [30, 0], [0, 30], [-30, 0]],  // up, right, down, left
 *       facingAngle  // optional: rotate the whole shape
 *   );
 * 
 * @param origin     The center/anchor point of the shape
 * @param points     Array of [x, y] offsets from origin
 * @param rotation   Optional rotation in radians (0 = no rotation)
 */
export function createPolygon(
    origin: Phaser.Math.Vector2,
    points: [number, number][],
    rotation: number = 0
): Phaser.Geom.Polygon {
    const transformedPoints = points.map(([x, y]) => {
        if (rotation !== 0) {
            // Rotate the point around the origin
            // This uses the standard 2D rotation formula:
            //   newX = x * cos(angle) - y * sin(angle)
            //   newY = x * sin(angle) + y * cos(angle)
            const cos = Math.cos(rotation);
            const sin = Math.sin(rotation);
            return new Phaser.Math.Vector2(
                origin.x + (x * cos - y * sin),
                origin.y + (x * sin + y * cos)
            );
        }
        // No rotation — just shift points to world position
        return new Phaser.Math.Vector2(origin.x + x, origin.y + y);
    });

    return new Phaser.Geom.Polygon(transformedPoints);
}


/**
 * Checks if a single point is inside a polygon.
 */
export function isInPolygon(
    polygon: Phaser.Geom.Polygon,
    pointX: number,
    pointY: number
): boolean {
    return Phaser.Geom.Polygon.Contains(polygon, pointX, pointY);
}


/**
 * Finds all objects from a group that are inside a polygon.
 * 
 * @param polygon   The polygon shape (use createPolygon to make one)
 * @param group     Phaser group to check (e.g. scene.Enemies)
 */
export function getObjectsInPolygon<T extends Phaser.GameObjects.GameObject & { x: number; y: number }>(
    polygon: Phaser.Geom.Polygon,
    group: Phaser.GameObjects.Group
): T[] {
    return getActiveObjects<T>(group).filter(
        obj => Phaser.Geom.Polygon.Contains(polygon, obj.x, obj.y)
    );
}
