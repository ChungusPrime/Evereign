import { getActiveObjects } from './types';

// ============================================================================
// Line Detection
// ============================================================================
// Lines are useful for narrow piercing attacks, laser beams, or checking
// if something is in a straight path.
//
// Two types of lines:
//
// 1. ATTACK LINE — Shoots forward from the character:
//    O ————————————> *     (origin → direction)
//
// 2. SWING LINE — A horizontal slash in front of the character:
//    O     *——+——*         (+ is the center, the line is perpendicular)
//          |  |  |
//          p1 c  p2
//
// ============================================================================


/**
 * Creates a line that shoots forward from a point.
 * Good for laser beams, bullet paths, or piercing attacks.
 * 
 * EXAMPLE (40px thrust starting 5px in front of character):
 *   const line = createAttackLine(player.x, player.y, facingAngle, 40, 5);
 * 
 * @param originX     Start X (character position)
 * @param originY     Start Y (character position)
 * @param direction   Which way the line points (radians)
 * @param length      How long the line is (pixels)
 * @param offset      How far in front of the origin to start (default 0)
 */
export function createAttackLine(
    originX: number,
    originY: number,
    direction: number,
    length: number,
    offset: number = 0
): Phaser.Geom.Line {
    // Start point: origin + offset in the facing direction
    const startX = originX + Math.cos(direction) * offset;
    const startY = originY + Math.sin(direction) * offset;

    // End point: start + length in the facing direction
    const endX = startX + Math.cos(direction) * length;
    const endY = startY + Math.sin(direction) * length;

    return new Phaser.Geom.Line(startX, startY, endX, endY);
}


/**
 * Creates a horizontal swing line in front of the character.
 * The line sits sideways (perpendicular) to the facing direction.
 * This was the original sword attack pattern.
 * 
 * EXAMPLE (swing 40px wide, 20px in front of player):
 *   const swing = createSwingLine(player.x, player.y, facingAngle, 20, 40);
 *   // swing.line = the Phaser line
 *   // swing.p1, swing.p2 = endpoints
 *   // swing.center = midpoint of the line
 * 
 * @param originX     Character X position
 * @param originY     Character Y position
 * @param direction   Which way the character faces (radians)
 * @param reach       How far in front of the character the line is
 * @param width       How wide the swing is (total left-to-right)
 */
export function createSwingLine(
    originX: number,
    originY: number,
    direction: number,
    reach: number,
    width: number
): { line: Phaser.Geom.Line; p1: Phaser.Math.Vector2; p2: Phaser.Math.Vector2; center: Phaser.Math.Vector2 } {
    // Center of the line = "reach" pixels in front of the character
    const centerX = originX + Math.cos(direction) * reach;
    const centerY = originY + Math.sin(direction) * reach;

    // The line goes sideways (perpendicular = 90° rotated from facing direction)
    // -sin and cos give us the perpendicular direction
    const sideX = -Math.sin(direction) * (width / 2);
    const sideY =  Math.cos(direction) * (width / 2);

    const p1 = new Phaser.Math.Vector2(centerX + sideX, centerY + sideY);
    const p2 = new Phaser.Math.Vector2(centerX - sideX, centerY - sideY);
    const center = new Phaser.Math.Vector2(centerX, centerY);

    return {
        line: new Phaser.Geom.Line(p1.x, p1.y, p2.x, p2.y),
        p1,
        p2,
        center
    };
}


/**
 * Checks if a line crosses through a rectangle (bounding box).
 * Useful for checking if a line attack hits an enemy's hitbox.
 */
export function lineIntersectsRect(
    line: Phaser.Geom.Line,
    rect: Phaser.Geom.Rectangle
): boolean {
    return Phaser.Geom.Intersects.LineToRectangle(line, rect);
}


/**
 * Finds enemies hit by a line, using the quadtree for performance.
 * 
 * @param line              The attack line
 * @param quadtree          Your quadtree instance
 * @param enemyRectClass    The EnemyRect class (for identifying enemies in the quadtree)
 * @param getBounds         A function that returns an enemy's bounding rectangle
 */
export function getEnemiesOnLineQuadtree<T, R extends { enemy: T }>(
    line: Phaser.Geom.Line,
    quadtree: { retrieve: (rect: any) => any[] },
    enemyRectClass: new (...args: any[]) => R,
    getBounds: (enemy: T) => Phaser.Geom.Rectangle
): T[] {
    // Build a bounding box around the line for the quadtree query
    const minX = Math.min(line.x1, line.x2);
    const minY = Math.min(line.y1, line.y2);
    const maxX = Math.max(line.x1, line.x2);
    const maxY = Math.max(line.y1, line.y2);

    // Add some padding so we don't miss enemies on the edge
    const padding = 20;
    const queryRect = {
        x: minX - padding,
        y: minY - padding,
        width: (maxX - minX) + padding * 2,
        height: (maxY - minY) + padding * 2
    };

    // Get nearby candidates, then check precise line intersection
    return quadtree.retrieve(queryRect)
        .filter((el): el is R => el instanceof enemyRectClass)
        .filter(el => Phaser.Geom.Intersects.LineToRectangle(line, getBounds(el.enemy)))
        .map(el => el.enemy);
}


/**
 * Finds all objects from a group that a line passes through.
 * Uses bounding box intersection (accounts for sprite size).
 * 
 * @param line    The attack line
 * @param group   Phaser group to check
 */
export function getObjectsOnLine<T extends Phaser.GameObjects.GameObject & { x: number; y: number; getBounds: () => Phaser.Geom.Rectangle }>(
    line: Phaser.Geom.Line,
    group: Phaser.GameObjects.Group
): T[] {
    return getActiveObjects<T>(group).filter(
        obj => Phaser.Geom.Intersects.LineToRectangle(line, (obj as any).getBounds())
    );
}


// ============================================================================
// Line of Sight (Raycasting)
// ============================================================================
// These check if there's a clear path between two points, or if a wall
// (collision tile) is in the way. Useful for tower AI, stealth mechanics,
// or checking if a projectile would hit a wall before reaching its target.
// ============================================================================


/**
 * Checks if there's a clear line of sight between two points.
 * Returns true if nothing is blocking the path.
 * 
 * EXAMPLE:
 *   if (hasLineOfSight(scene, tower.x, tower.y, enemy.x, enemy.y, collisionLayer)) {
 *       tower.fireAt(enemy);
 *   }
 * 
 * @param scene            The current scene
 * @param fromX            Start X
 * @param fromY            Start Y
 * @param toX              End X
 * @param toY              End Y
 * @param collisionLayer   The tilemap layer that blocks sight
 */
export function hasLineOfSight(
    scene: Phaser.Scene,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    collisionLayer: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer
): boolean {
    const line = new Phaser.Geom.Line(fromX, fromY, toX, toY);
    const tilesAlongLine = collisionLayer.getTilesWithinShape(line);

    // If any tile along the line blocks movement, sight is blocked
    return !tilesAlongLine.some(tile => tile && tile.collides);
}


/**
 * Like hasLineOfSight, but also tells you WHERE the line was blocked.
 * Returns { clear: true } if nothing in the way, or
 * { clear: false, hitPoint: Vector2 } with the position of the first wall hit.
 * 
 * EXAMPLE:
 *   const result = raycast(scene, player.x, player.y, target.x, target.y, walls);
 *   if (result.clear) {
 *       // Nothing in the way
 *   } else {
 *       // Wall at result.hitPoint.x, result.hitPoint.y
 *   }
 */
export function raycast(
    scene: Phaser.Scene,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    collisionLayer: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer
): { clear: boolean; hitPoint?: Phaser.Math.Vector2 } {
    const line = new Phaser.Geom.Line(fromX, fromY, toX, toY);
    const tilesAlongLine = collisionLayer.getTilesWithinShape(line);

    for (const tile of tilesAlongLine) {
        if (tile && tile.collides) {
            return {
                clear: false,
                hitPoint: new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY())
            };
        }
    }

    return { clear: true };
}
