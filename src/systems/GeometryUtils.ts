/**
 * Geometry utility functions for combat calculations, collision detection, etc.
 */

/**
 * Check if a point is within a cone shape.
 * Useful for cone-based attacks, vision checks, etc.
 * 
 * @param px - Point X coordinate to check
 * @param py - Point Y coordinate to check
 * @param originX - Cone origin X coordinate
 * @param originY - Cone origin Y coordinate
 * @param angle - Direction the cone is facing (in degrees)
 * @param spread - Total spread of the cone (in degrees)
 * @param length - Maximum distance/length of the cone
 * @returns True if the point is within the cone
 */
export function isPointInCone(
    px: number, 
    py: number, 
    originX: number, 
    originY: number, 
    angle: number, 
    spread: number, 
    length: number
): boolean {
    const dx = px - originX;
    const dy = py - originY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > length) {
        return false;
    }

    const pointAngle = Phaser.Math.RadToDeg(Math.atan2(dy, dx));
    const halfSpread = spread / 2;
    const minAngle = angle - halfSpread;
    const maxAngle = angle + halfSpread;

    return pointAngle >= minAngle && pointAngle <= maxAngle;
}

/**
 * Filter game objects to find those within a cone shape.
 * 
 * @param originX - Cone origin X coordinate
 * @param originY - Cone origin Y coordinate
 * @param angle - Direction the cone is facing (in degrees)
 * @param spread - Total spread of the cone (in degrees)
 * @param length - Maximum distance/length of the cone
 * @param gameObjects - Array of game objects to check
 * @returns Array of game objects that are within the cone
 */
export function getObjectsInCone(
    originX: number, 
    originY: number, 
    angle: number, 
    spread: number, 
    length: number, 
    gameObjects: Phaser.GameObjects.GameObject[]
): Phaser.GameObjects.GameObject[] {
    const objectsInCone: Phaser.GameObjects.GameObject[] = [];
    
    gameObjects.forEach((obj: Phaser.GameObjects.Sprite) => {
        if (isPointInCone(obj.x, obj.y, originX, originY, angle, spread, length)) {
            objectsInCone.push(obj);
        }
    });

    return objectsInCone;
}
