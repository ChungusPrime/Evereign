import Game from "../scenes/Game";
import UI from "../scenes/UI";
import FloatingText from "../objects/game/FloatingText";
import { GD, Inv } from "../scenes/Game";
import ItemData from "../data/ItemData";
import Abilities from "../data/Abilities";
import { ApplyOnUseEffects } from "./OnUseProcessor";
import Objects from "../data/Objects";

/*
    The ActionManager system is responsible for handling player actions such as mining, woodcutting, harvesting, and other activities that require a progress bar and time to complete. 
    It manages the current activity the player is performing, updates the progress bar, and grants rewards upon completion of the activity.
    - Harvesting nodes (Trees, deposits, plants)
    - Reloading weapons
    - Drinking Potions
    - Eating Food
    - Using abilities:
        - Channeled (Abilities which require the player to channel, applying their effects at fixed intervals during the channeling time)
        - Charge (Abilities which can be held for a certain amount of time to increase their effect, up to a maximum)
        - Cast (Abilities which have a cast time before they are performed)
*/

export default class ActionManager {

    public scene: Game;
    public UI: UI;
    
    public CurrentActivity: Activity = {
        Type: "",
        Delta: 0,
        IsAbility: false,
        AbilityID: null,
        IsItem: false,
        ItemID: null,
        TiledID: null,
        WorldObjectType: null,
        IsReloading: false,
        IsHarvesting: false,
        TargetX: null,
        TargetY: null,
    }

    public ActivityProgressBarBG: Phaser.GameObjects.Rectangle;
    public ActivityProgressBar: Phaser.GameObjects.Sprite;
    public ActivityProgressText: Phaser.GameObjects.Text;

    // Targeting mode state (for manual-target abilities)
    public TargetingIndicator!: Phaser.GameObjects.Arc;
    public TargetingAbility: Ability | null = null;
    get IsTargeting(): boolean { return this.TargetingAbility !== null; }

    constructor ( scene: Game, UI: UI ) {
        this.scene = scene;
        this.UI = UI;
        this.ActivityProgressBarBG = this.UI.add.rectangle(this.UI.cameras.main.width / 2 - 200, this.UI.cameras.main.height * 0.85, 200, 20, 0x000000, 0.9).setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressBar = this.UI.add.sprite(this.UI.cameras.main.width / 2 - 200, this.UI.cameras.main.height * 0.85, "Kenney-UI", "barYellow_horizontalMid").setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressText = this.UI.add.text(this.ActivityProgressBar.getTopCenter().x, this.ActivityProgressBar.getTopCenter().y - this.ActivityProgressBar.height, "Current Activity", { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0.5)
        .setVisible(false);
        this.TargetingIndicator = scene.add.circle(0, 0, 16, 0xffff00, 0.5).setDepth(10000).setVisible(false);
    }

    ReloadMainhandWeapon () {
        this.CurrentActivity.Delta = 0;
        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(true);
        this.CurrentActivity.Type = "Reloading"
        this.ActivityProgressText.setText("Reloading...").setVisible(true);
        this.ActivityProgressBarBG.setVisible(true);
        this.CurrentActivity.IsReloading = true;
    }

    private BeginItemActivity (data: ItemData) {
        this.CurrentActivity.IsItem = true;
        this.CurrentActivity.ItemID = data.ID;
        this.CurrentActivity.Delta = 0;
        this.CurrentActivity.Type = `Using ${data.Name}`;
        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(true);
        this.ActivityProgressText.setText(`Using ${data.Name}`).setVisible(true);
        this.ActivityProgressBarBG.setVisible(true);
    }

    private BeginAbilityActivity (ability: Ability) {
        this.CurrentActivity.IsAbility = true;
        this.CurrentActivity.AbilityID = ability.ID;
        this.CurrentActivity.Delta = 0;
        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(true);
        this.ActivityProgressBarBG.setVisible(true);
        let Text = ability.Name;
        switch (ability.ActiviationType) {
            case "Channeled": Text = `Channeling ${ability.Name}`; break;
            case "Charge": Text = `Charging ${ability.Name}`; break;
            case "Cast": Text = `Casting ${ability.Name}`; break;
        }
        this.CurrentActivity.Type = Text;
        this.ActivityProgressText.setText(Text).setVisible(true);
    }

    // ── Targeting mode ──────────────────────────────────────────────────────────
    ActivateTargeting (ability: Ability): void {
        this.TargetingAbility = ability;
        this.TargetingIndicator.setRadius(ability.targeting_radius);
        this.TargetingIndicator.setVisible(true);
        this.UI.TargetingModeHelpText.setVisible(true);
    }

    SelectTarget (x: number, y: number): void {
        if (!this.TargetingAbility) return;
        const ability = this.TargetingAbility;
        this.CancelTargeting();

        if (ability.ActiviationType === "Instant" || !ability.CastTime) {
            if (ability.OnUse) ApplyOnUseEffects(this.scene, ability.OnUse, undefined, x, y);
        } else {
            this.CurrentActivity.TargetX = x;
            this.CurrentActivity.TargetY = y;
            this.BeginAbilityActivity(ability);
        }
    }

    CancelTargeting (): void {
        this.TargetingAbility = null;
        this.TargetingIndicator.setVisible(false);
        this.UI.TargetingModeHelpText.setVisible(false);
    }

    // Public action entry points
    UseHotbarSlot (slot: string) {
        const hotbarItem = GD.Hotbar[slot];
        if (!hotbarItem) return;

        if (hotbarItem.Type === "Ability") {
            const ability = Abilities[hotbarItem.ID];

            if (ability.requires_weapon_equipped && !GD.Inventory.Equipment_MainHand)
                return this.scene.UI.EventLog.NewEvent("You need a weapon equipped to use this ability");

            // If this charge ability is already being charged, release it immediately
            if (ability.ActiviationType === "Charge" && this.CurrentActivity.IsAbility && this.CurrentActivity.AbilityID === ability.ID) {
                const chargeRatio = Math.min(this.CurrentActivity.Delta / ability.ChargeTime, 1);
                console.log(`${ability.Name} released at ${(chargeRatio * 100).toFixed(1)}% charge (${this.CurrentActivity.Delta.toFixed(0)}ms / ${ability.ChargeTime}ms).`);
                if (ability.OnUse) ApplyOnUseEffects(this.scene, ability.OnUse);
                return this.CancelActivity();
            }

            if (ability.targeting === "manual")
                return this.ActivateTargeting(ability);

            if (ability.ActiviationType === "Instant") {
                if (ability.OnUse) ApplyOnUseEffects(this.scene, ability.OnUse);
            } else {
                this.BeginAbilityActivity(ability);
            }
            return;
        }

        if (hotbarItem.Type === "Item") {
            const data = ItemData[hotbarItem.ID];

            if (data.Category === "Ammunition") {
                if (GD.Inventory.Equipment_MainHand) this.ReloadMainhandWeapon();
                return;
            }

            if (data.UseTime) {
                if (!Inv.HasRequiredQuantity(hotbarItem.ID, 1))
                    return this.scene.UI.EventLog.NewEvent(`You have no ${data.Name} left`);
                this.BeginItemActivity(data);
            } else {
                if (!Inv.HasRequiredQuantity(hotbarItem.ID, 1))
                    return this.scene.UI.EventLog.NewEvent(`You have no ${data.Name} left`);
                Inv.RemoveItem(hotbarItem.ID, 1);
                if (data.OnUse) ApplyOnUseEffects(this.scene, data.OnUse, data.ID);
            }
        }
    }

    UseItem (itemId: string) {
        const data = ItemData[itemId];
        if (!Inv.HasRequiredQuantity(itemId, 1))
            return this.scene.UI.EventLog.NewEvent(`You have no ${data.Name} left`);
        if (data.UseTime) {
            this.BeginItemActivity(data);
        } else {
            Inv.RemoveItem(itemId, 1);
            if (data.OnUse) ApplyOnUseEffects(this.scene, data.OnUse, itemId);
        }
    }

    StartHarvesting( object: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Rectangle ) {

        if ( object == null ) return;
        if ( object.getData("type") == null || object.getData("type") == undefined ) return;

        const ObjectType = object.getData("type");

        if ( Phaser.Math.Distance.BetweenPoints(this.scene.PlayerCharacter, { x: object.getCenter().x, y: object.getCenter().y }) > 75 )
            return this.scene.UI.EventLog.NewEvent("That is too far away");

        const data = Objects[ObjectType];
        if ( !data ) return console.log(`No activity data found for object type: ${ObjectType}`);

        this.CurrentActivity.Delta = 0;
        this.CurrentActivity.Type = data.ActivityLabel;
        this.CurrentActivity.WorldObjectType = ObjectType;
        this.CurrentActivity.TiledID = object.getData("tiled_id");
        this.CurrentActivity.IsHarvesting = true;

        this.scene.sound.play(data.HarvestSound, { loop: true });
        this.scene.UI.EventLog.NewEvent(`You start ${data.ActivityLabel}`);

        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(true);
        this.ActivityProgressText.setText(data.ActivityLabel).setVisible(true);
        this.ActivityProgressBarBG.setVisible(true);

    }

    update ( delta: number ) {

        if (this.IsTargeting) 
            this.TargetingIndicator.setPosition(this.scene.mouseX, this.scene.mouseY);

        if ( this.CurrentActivity.Type == "" ) 
            return;
        
        this.CurrentActivity.Delta += delta;

        // Handle ability activities
        if ( this.CurrentActivity.IsAbility ) {

            const Ability = Abilities[this.CurrentActivity.AbilityID];
            let MaxTime = Ability.MaxChannelTime ?? Ability.ChargeTime ?? Ability.CastTime ?? 0;

            // Invoke ability effects when we cross a channel interval threshold
            if ( Ability.hasOwnProperty("ChannelInterval") ) {
                const previousIntervals = Math.floor((this.CurrentActivity.Delta - delta) / Ability.ChannelInterval);
                const currentIntervals = Math.floor(this.CurrentActivity.Delta / Ability.ChannelInterval);
                if ( currentIntervals > previousIntervals ) {
                    console.log(`Applying channeled effect of ${Ability.Name}`);
                    if (Ability?.OnUse) ApplyOnUseEffects(this.scene, Ability.OnUse);
                }
                if ( MaxTime > 0 && this.CurrentActivity.Delta >= MaxTime ) {
                    console.log(`Max channel time reached for ${Ability.Name}, ending channel.`);
                    return this.CancelActivity();
                }
            }

            if ( Ability.ActiviationType == "Charge" && this.CurrentActivity.Delta >= Ability.ChargeTime ) {
                console.log(`${Ability.Name} fully charged (${Ability.ChargeTime}ms), performing ability.`);
                if (Ability?.OnUse) ApplyOnUseEffects(this.scene, Ability.OnUse);
                return this.CancelActivity();
            }

            if ( Ability.ActiviationType == "Cast" && this.CurrentActivity.Delta >= Ability.CastTime ) {
                console.log(`Cast time completed for ${Ability.Name}, performing ability.`);
                if (Ability?.OnUse) ApplyOnUseEffects(this.scene, Ability.OnUse, undefined, this.CurrentActivity.TargetX, this.CurrentActivity.TargetY);
                return this.CancelActivity();
            }

            this.ActivityProgressBar.setDisplaySize(Math.min(this.CurrentActivity.Delta / MaxTime, 1) * 200, 20);
        }
        
        // Handle item usage activities
        if ( this.CurrentActivity.IsItem ) {
            const data = ItemData[this.CurrentActivity.ItemID];
            const useTime = data.UseTime;
            this.ActivityProgressBar.setDisplaySize(Math.min(this.CurrentActivity.Delta / useTime, 1) * 200, 20);
            if ( this.CurrentActivity.Delta >= useTime ) {
                if ( !Inv.HasRequiredQuantity(data.ID, 1) ) {
                    this.scene.UI.EventLog.NewEvent("You have no more of this item left");
                    return this.CancelActivity();
                }
                Inv.RemoveItem(data.ID, 1);
                if ( data.OnUse ) ApplyOnUseEffects(this.scene, data.OnUse, data.ID);
                return this.CancelActivity();
            }
        } 
        
        // Handle reloading activity
        if ( this.CurrentActivity.IsReloading ) {

            this.ActivityProgressBar.setDisplaySize(Math.min(this.CurrentActivity.Delta / 1000, 1) * 200, 20);
            if ( this.CurrentActivity.Delta < 1000 ) return;

            let MainhandItem = ItemData[GD.Inventory.Equipment_MainHand.ID];
            let CurrentLoadedAmmo = GD.Inventory.Equipment_MainHand.Ammo;
            let MaxMagazine = MainhandItem.Properties.MagazineSize;
            let Match = Object.entries(GD.Inventory).find( ([key, invItem]) => {
                if ( invItem && invItem.ID == CurrentLoadedAmmo ) {
                    GD.Inventory.Equipment_MainHand.CurrentMagazine = MaxMagazine;
                    this.scene.Inventory.RemoveItem(CurrentLoadedAmmo, MaxMagazine);
                    console.log("Reloaded!");
                    this.scene.sound.play("ShotgunReload");
                    return true;
                }
            });

            if ( !Match ) console.log("No ammo!");

            this.CancelActivity();
            return;
        }
        
        // Handle harvesting activity
        if ( this.CurrentActivity.IsHarvesting ) {

            // World object harvesting — driven by ObjectData
            const objectData = Objects[this.CurrentActivity.WorldObjectType];
            if ( !objectData ) return this.CancelActivity();

            this.ActivityProgressBar.setDisplaySize(Math.min(this.CurrentActivity.Delta / objectData.HarvestTime, 1) * 200, 20);
            if ( this.CurrentActivity.Delta < objectData.HarvestTime ) return;

            const ev = {
                message: objectData.FloatMessage,
                sprite1: objectData.FloatSprite,
                sprite2: objectData.FloatFrame,
                x: this.scene.PlayerCharacter.x,
                y: this.scene.PlayerCharacter.y
            };

            this.scene.Inventory.AddItem(objectData.HarvestItem, objectData.BaseHarvestAmount);
            GD.Skills[objectData.HarvestExperienceType].Experience += objectData.HarvestExperienceValue;

            if ( objectData.DepletesOnHarvest ) {
                this.scene.Objects.getChildren().forEach( (tree: Phaser.Physics.Arcade.Sprite) => {
                    if ( tree.getData("tiled_id") == this.CurrentActivity.TiledID ) {
                        (tree as any).Deplete();
                    }
                });
                this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, ev));
                return this.CancelActivity();
            }

            this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, ev));

        }

    }

    CancelActivity () {
        if ( this.CurrentActivity.Type != "Reloading" ) {
            this.scene.UI.EventLog.NewEvent(`You stop ${this.CurrentActivity.Type}`);
        }
        this.CurrentActivity = { Type: "", Delta: 0, IsAbility: false, AbilityID: null, IsItem: false, ItemID: null, TiledID: null, WorldObjectType: null, IsReloading: false, IsHarvesting: false, TargetX: null, TargetY: null };
        this.scene.sound.stopByKey("woodcutting");
        this.scene.sound.stopByKey("mining");
        this.scene.sound.stopByKey("harvesting");
        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(false);
        this.ActivityProgressText.setVisible(false);
        this.ActivityProgressBarBG.setVisible(false);
    }

}