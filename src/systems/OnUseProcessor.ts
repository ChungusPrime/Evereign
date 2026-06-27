import Game from '../scenes/Game';
import { GD } from '../scenes/Game';
import Grenade from '../objects/game/Grenade';
import PyroPellet from '../objects/game/PyroPellet';
import ChargedSlug from '../objects/game/ChargedSlug';
import { EnemyRect } from '../objects/game/QuadTree_Rects';
import { getEnemiesInCircleQuadtree } from '../utils/geometry/circles';

/**
 * Reads an OnUseEffect config object and applies every effect it describes.
 * Called by UseHotbarSlot (items), UseItem (inventory right-click), and
 * UseAbility (instant abilities / when channeled/cast/charge fires).
 *
 * To add a new effect type, add a key to the OnUseEffect interface in
 * src/types/effects.d.ts and handle it here.
 */
export function ApplyOnUseEffects(scene: Game, effects: OnUseEffect | OnUseEffect[], itemId?: string, targetX?: number, targetY?: number): void {

    if (Array.isArray(effects)) {
        effects.forEach(e => ApplyOnUseEffects(scene, e, itemId, targetX, targetY));
        return;
    }

    if (effects.Heal !== undefined) {
        scene.PlayerCharacter.Heal(effects.Heal);
    }

    if (effects.RestoreMana !== undefined) {
        const pc = scene.PlayerCharacter;
        pc.CurrentMana = Math.min(pc.CurrentMana + effects.RestoreMana, pc.ComputedStats.MaxMana);
        scene.UI.CharacterPanel.UpdateVitalsBars();
        scene.UI.EventLog.NewEvent(`You restored ${effects.RestoreMana} mana`);
    }

    if (effects.GiveXP !== undefined) {
        scene.PlayerCharacter.AddXP(effects.GiveXP);
    }

    if (effects.UnlockBuilding !== undefined) {
        const building = effects.UnlockBuilding;
        if (!GD.UnlockedBuildings.includes(building)) {
            GD.UnlockedBuildings.push(building);
            scene.UI.EventLog.NewEvent(`You have unlocked the ability to build ${building}s!`);
        } else {
            scene.UI.EventLog.NewEvent(`You already know how to build ${building}s.`);
        }
    }

    if (effects.ApplyEffect !== undefined) {
        // TODO: implement status effect application via an Effects system
        console.log(`Applying status effect: ${effects.ApplyEffect.ID}`, effects.ApplyEffect.Duration ?? 'default duration');
    }

    if (effects.SpawnProjectile !== undefined) {
        const cfg = effects.SpawnProjectile;
        const pc = scene.PlayerCharacter;
        const angle = Phaser.Math.Angle.Between(pc.x, pc.y, scene.mouseX, scene.mouseY);

        if (cfg.Type === "Grenade") {
            const sprite = (itemId ? scene.DataManager.GetItemData(itemId)?.Sprite : null) ?? 'ownmisc-0';
            const proj = new Grenade(scene, pc.x, pc.y, cfg.Velocity, cfg.Damage, sprite);
            if (cfg.Lifetime !== undefined) proj.Lifetime = cfg.Lifetime;
            proj.rotation = angle;
            proj.setVelocity(Math.cos(angle) * cfg.Velocity, Math.sin(angle) * cfg.Velocity);
            scene.Grenades.add(proj);
        }

        if (cfg.Type === "PyroPellet") {
            const sprite = (itemId ? scene.DataManager.GetItemData(itemId)?.Sprite : null) ?? 'ownmisc-0';
            const proj = new PyroPellet(scene);
            scene.Projectiles.add(proj);
        }

        if (cfg.Type === "ChargedSlug") {
            const sprite = (itemId ? scene.DataManager.GetItemData(itemId)?.Sprite : null) ?? 'ownmisc-0';
            const proj = new ChargedSlug(scene);
            scene.Projectiles.add(proj);
        }

    }

    if (effects.Charge !== undefined) {
        const cfg = effects.Charge;
        const pc = scene.PlayerCharacter;
        pc.PlayerHasControl = false; // prevent other movement inputs during the dash
        const angle = Phaser.Math.Angle.Between(pc.x, pc.y, scene.mouseX, scene.mouseY);
        const dashSpeed = pc.ComputedStats.MovementSpeed * cfg.SpeedMultiplier;
        pc.setVelocity(Math.cos(angle) * dashSpeed, Math.sin(angle) * dashSpeed);
        scene.time.delayedCall(cfg.Duration, () => {
            pc.setVelocity(0, 0);
            pc.PlayerHasControl = true; // restore control after the dash ends
        });
    }

    if (effects.KnockBack !== undefined) {
        const cfg = effects.KnockBack;
        const origin = cfg.Origin ?? 'player';
        const pc = scene.PlayerCharacter;
        const ox = origin === 'mouse' ? scene.mouseX : pc.x;
        const oy = origin === 'mouse' ? scene.mouseY : pc.y;
        const nearby = getEnemiesInCircleQuadtree(
            ox, oy, cfg.Radius,
            scene.Quadtree,
            EnemyRect,
            (enemy: Phaser.Physics.Arcade.Sprite) => enemy.getBounds()
        );
        nearby.forEach((enemy: Phaser.Physics.Arcade.Sprite) => {
            const angle = Phaser.Math.Angle.Between(ox, oy, enemy.x, enemy.y);
            const body = enemy.body as Phaser.Physics.Arcade.Body;
            body.setVelocity(Math.cos(angle) * cfg.Force, Math.sin(angle) * cfg.Force);
        });
    }

}
