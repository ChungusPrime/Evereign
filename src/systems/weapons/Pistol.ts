import Game from '../../scenes/Game';
import { GD } from '../../scenes/Game';
import Projectile from '../../objects/game/Projectile';
import ItemDataDict from '../../data/ItemData';

export function UsePistol(scene: Game, data: ItemData): void {
    if (GD.Inventory.Equipment_MainHand.CurrentMagazine <= 0) return;
    const ammoData = ItemDataDict[GD.Inventory.Equipment_MainHand.Ammo];
    const baseAngle = Phaser.Math.Angle.Between(scene.PlayerCharacter.x, scene.PlayerCharacter.y, scene.mouseX, scene.mouseY);
    // Pistols have very slight spread - more accurate than crossbows but still not perfect
    const spreadDegrees = 1.5;
    const spreadAngle = Phaser.Math.DegToRad(Phaser.Math.FloatBetween(-spreadDegrees / 2, spreadDegrees / 2));
    const angle = baseAngle + spreadAngle;
    const velocity = data.Properties.Velocity;
    const proj = new Projectile(scene, scene.PlayerCharacter.x, scene.PlayerCharacter.y, velocity, ammoData.Properties.DamageMod, "PistolBullet", angle);
    proj.setVelocity(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
    scene.Projectiles.add(proj);
    GD.Inventory.Equipment_MainHand.CurrentMagazine -= 1;
}
