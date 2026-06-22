import Game from '../../scenes/Game';
import Enemy from '../../objects/game/Character';
import { getObjectsInArc, ArcWidths } from '../../utils/geometry';

export function RenderAttackArea(scene: Game, data: ItemData, graphics: Phaser.GameObjects.Graphics): void {
    const direction = Phaser.Math.Angle.Between(scene.PlayerCharacter.x, scene.PlayerCharacter.y, scene.mouseX, scene.mouseY);
    const reach = data.Properties.Range;
    const pc = scene.PlayerCharacter.getCenter();

    graphics.lineStyle(2, 0x00ff00, 0.5);
    graphics.beginPath();
    graphics.arc(pc.x, pc.y, reach, direction - ArcWidths.WIDE / 2, direction + ArcWidths.WIDE / 2);
    graphics.strokePath();
    graphics.lineBetween(pc.x, pc.y, pc.x + Math.cos(direction - ArcWidths.WIDE / 2) * reach, pc.y + Math.sin(direction - ArcWidths.WIDE / 2) * reach);
    graphics.lineBetween(pc.x, pc.y, pc.x + Math.cos(direction + ArcWidths.WIDE / 2) * reach, pc.y + Math.sin(direction + ArcWidths.WIDE / 2) * reach);
}

export function UseSword(scene: Game, data: ItemData): void {
    console.log("Using sword");

    const pc = scene.PlayerCharacter.getCenter();
    const direction = Phaser.Math.Angle.Between(pc.x, pc.y, scene.mouseX, scene.mouseY);
    const reach = data.Properties.Range;

    const hits = getObjectsInArc<Enemy>(
        new Phaser.Math.Vector2(pc.x, pc.y),
        direction,
        ArcWidths.WIDE,
        reach,
        scene.Enemies,
        false
    );

    hits.forEach(hit => {
        hit.object.TakeDamage(data.Properties.Damage || 10);
    });

    // Flash the hit area using the shared render function, then destroy it
    const g = scene.add.graphics().setDepth(10000);
    g.fillStyle(0x00ff00, 0.35);
    g.beginPath();
    g.moveTo(pc.x, pc.y);
    g.arc(pc.x, pc.y, reach, direction - ArcWidths.WIDE / 2, direction + ArcWidths.WIDE / 2);
    g.closePath();
    g.fillPath();
    RenderAttackArea(scene, data, g);
    scene.time.delayedCall(150, () => g.destroy());

    console.log(hits.length > 0 ? "Hit enemies:" : "No enemies hit", hits.map(h => h.object));
}
