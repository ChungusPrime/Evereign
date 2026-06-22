import Game from '../../scenes/Game';
import { GD } from '../../scenes/Game';
import Projectile from '../../objects/game/Projectile';
import ItemDataDict from '../../data/ItemData';

export function UseBow(scene: Game, data: ItemData): void {
    if (GD.Inventory.Equipment_MainHand.CurrentMagazine <= 0) return;
    const ammoData = ItemDataDict[GD.Inventory.Equipment_MainHand.Ammo];
    const baseAngle = Phaser.Math.Angle.Between(scene.PlayerCharacter.x, scene.PlayerCharacter.y, scene.mouseX, scene.mouseY);
    // Bows have no spread — a well-aimed shot goes exactly where you aim
    const velocity = data.Properties.Velocity;
    const proj = new Projectile(scene, scene.PlayerCharacter.x, scene.PlayerCharacter.y, velocity, ammoData.Properties.DamageMod, "Arrow", baseAngle);
    proj.setVelocity(Math.cos(baseAngle) * velocity, Math.sin(baseAngle) * velocity);
    scene.Projectiles.add(proj);
    GD.Inventory.Equipment_MainHand.CurrentMagazine -= 1;
}
