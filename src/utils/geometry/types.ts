/**
 * When we check if something is hit by an attack shape, we return
 * the object that was hit, plus how far away and at what angle it was.
 */
export interface GeometryHitResult<T> {
    object: T;
    distance: number;
    angle: number;
}

/**
 * Shared config for melee weapon attacks.
 * 
 *   origin:    Where the attacker is standing (x, y)
 *   direction: The angle they're facing, in radians (e.g. towards the mouse cursor)
 *   reach:     How far the attack extends in pixels
 */
export interface MeleeAttackConfig {
    origin: Phaser.Math.Vector2;
    direction: number;
    reach: number;
}

/**
 * Handy preset arc widths so you don't have to remember the maths.
 * These are in radians - just use them directly with arc functions.
 * 
 * Example:
 *   getObjectsInArc(origin, direction, ArcWidths.WIDE, 50, enemies);
 *   // Checks a 90° cone, 50px range
 */
export const ArcWidths = {
    NARROW:    Math.PI / 6,   // 30°  - thin slice
    MEDIUM:    Math.PI / 4,   // 45°  - quarter cone
    WIDE:      Math.PI / 2,   // 90°  - good for sword swings
    VERY_WIDE: Math.PI,       // 180° - half circle (semicircle)
    FULL:      Math.PI * 2    // 360° - full circle (all around)
};

/**
 * Converts a facing direction name (like "up", "down-left") into radians.
 * Useful when your character animations use named directions but you need
 * the angle for geometry calculations.
 * 
 *   "right"      → 0
 *   "down"       → π/2  (90°)
 *   "left"       → π    (180°)
 *   "up"         → -π/2 (270°)
 */
export function directionToRadians(direction: string): number {
    const map: { [key: string]: number } = {
        'right':      0,
        'down-right': Math.PI / 4,
        'down':       Math.PI / 2,
        'down-left':  3 * Math.PI / 4,
        'left':       Math.PI,
        'up-left':    -3 * Math.PI / 4,
        'up':         -Math.PI / 2,
        'up-right':   -Math.PI / 4
    };
    return map[direction] ?? 0;
}

/**
 * Gets the angle (in radians) from one object to a target point.
 * 
 * Example:
 *   const angle = angleToTarget(player, mouseX, mouseY);
 */
export function angleToTarget(
    obj: { x: number; y: number },
    targetX: number,
    targetY: number
): number {
    return Phaser.Math.Angle.Between(obj.x, obj.y, targetX, targetY);
}

/**
 * Filters a Phaser group down to only active objects.
 * Used internally by the shape functions.
 */
export function getActiveObjects<T extends Phaser.GameObjects.GameObject & { x: number; y: number }>(
    group: Phaser.GameObjects.Group
): T[] {
    return group.getChildren().filter(obj => obj.active) as T[];
}
