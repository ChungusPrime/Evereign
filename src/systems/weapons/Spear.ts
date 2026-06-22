import Game from '../../scenes/Game';
import Enemy from '../../objects/game/Character';
import { createAttackLine, getObjectsOnLine } from '../../utils/geometry';

export function RenderAttackArea(scene: Game, data: ItemData, graphics: Phaser.GameObjects.Graphics): void {
    const direction = Phaser.Math.Angle.Between(scene.PlayerCharacter.x, scene.PlayerCharacter.y, scene.mouseX, scene.mouseY);
    const reach = data.Properties.Range;
    const pc = scene.PlayerCharacter.getCenter();

    graphics.lineStyle(3, 0xffff00, 0.6);
    graphics.lineBetween(
        pc.x, pc.y,
        pc.x + Math.cos(direction) * reach,
        pc.y + Math.sin(direction) * reach
    );
}

export function UseSpear(scene: Game, data: ItemData): void {
    const pc = scene.PlayerCharacter.getCenter();
    const direction = Phaser.Math.Angle.Between(pc.x, pc.y, scene.mouseX, scene.mouseY);

    const hits = getObjectsOnLine<Enemy>(createAttackLine(pc.x, pc.y, direction, data.Properties.Range, 8), scene.Enemies);

    hits.forEach(hit => {
        hit.TakeDamage(data.Properties.Damage || 20);
    });

    // Flash the hit area using the shared render function, then destroy it
    const g = scene.add.graphics().setDepth(10000);
    RenderAttackArea(scene, data, g);
    scene.time.delayedCall(150, () => g.destroy());

    console.log(hits.length > 0 ? "Hit enemies:" : "No enemies hit", hits);
}
