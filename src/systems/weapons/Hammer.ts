import Game from '../../scenes/Game';
import Enemy from '../../objects/game/Character';
import { getObjectsInCircle } from '../../utils/geometry';

export function RenderAttackArea(scene: Game, data: ItemData, graphics: Phaser.GameObjects.Graphics): void {
    const direction = Phaser.Math.Angle.Between(scene.PlayerCharacter.x, scene.PlayerCharacter.y, scene.mouseX, scene.mouseY);
    const radius = data.Properties.Radius || 24;
    const pc = scene.PlayerCharacter.getCenter();

    graphics.fillStyle(0x0000ff, 0.5);
    graphics.fillCircle(
        pc.x + Math.cos(direction) * radius,
        pc.y + Math.sin(direction) * radius,
        radius
    );
}

export function UseHammer(scene: Game, data: ItemData): void {
    const pc = scene.PlayerCharacter.getCenter();
    const direction = Phaser.Math.Angle.Between(pc.x, pc.y, scene.mouseX, scene.mouseY);
    const radius = data.Properties.Radius || 24;
    const impactX = pc.x + Math.cos(direction) * data.Properties.Range;
    const impactY = pc.y + Math.sin(direction) * data.Properties.Range;

    const hits = getObjectsInCircle<Enemy>(impactX, impactY, radius, scene.Enemies);

    hits.forEach(hit => {
        hit.object.TakeDamage(data.Properties.Damage || 15);
    });

    // Flash the hit area using the shared render function, then destroy it
    const g = scene.add.graphics().setDepth(10000);
    RenderAttackArea(scene, data, g);
    scene.time.delayedCall(150, () => g.destroy());

    console.log(hits.length > 0 ? "Hit enemies:" : "No enemies hit", hits.map(h => h.object));
}
