import Game from "../scenes/Game";
import UI from "../scenes/UI";
import FloatingText from "../game_objects/FloatingText";
import { GD } from "../scenes/Game";
import ItemData from "../data/ItemData";
import Abilities from "../data/Abilities";

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
        AbilityID: null
    }

    public ActivityProgressBarBG: Phaser.GameObjects.Rectangle;
    public ActivityProgressBar: Phaser.GameObjects.Sprite;
    public ActivityProgressText: Phaser.GameObjects.Text;
    
    constructor ( scene: Game, UI: UI ) {
        this.scene = scene;
        this.UI = UI;
        this.ActivityProgressBarBG = this.UI.add.rectangle(this.UI.cameras.main.width / 2 - 200, this.UI.cameras.main.height * 0.85, 200, 20, 0x000000, 0.9).setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressBar = this.UI.add.sprite(this.UI.cameras.main.width / 2 - 200, this.UI.cameras.main.height * 0.85, "Kenney-UI", "barYellow_horizontalMid").setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressText = this.UI.add.text(this.ActivityProgressBar.getTopCenter().x, this.ActivityProgressBar.getTopCenter().y - this.ActivityProgressBar.height, "Current Activity", { 
            fontFamily: "Augusta",
            fontSize: 24 
        }).setOrigin(0.5).setVisible(false);
    }

    ReloadMainhandWeapon () {
        this.CurrentActivity.Delta = 0;
        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(true);
        this.CurrentActivity.Type = "Reloading"
        this.ActivityProgressText.setText("Reloading...").setVisible(true);
        this.ActivityProgressBarBG.setVisible(true);
    }

    UseAbility (ability: Ability) {

        this.CurrentActivity.IsAbility = true;
        this.CurrentActivity.AbilityID = ability.ID;

        if ( ability.ActiviationType == "Channeled" ) {
            this.CurrentActivity.Delta = 0;
            this.ActivityProgressBar.setDisplaySize(0, 20);
            this.ActivityProgressBar.setVisible(true);
            this.CurrentActivity.Type = `Channeling ${ability.Name}`;
            this.ActivityProgressText.setText(`Channeling ${ability.Name}`).setVisible(true);
            this.ActivityProgressBarBG.setVisible(true);
        } else if ( ability.ActiviationType == "Charge" ) {
            this.CurrentActivity.Delta = 0;
            this.ActivityProgressBar.setDisplaySize(0, 20);
            this.ActivityProgressBar.setVisible(true);
            this.CurrentActivity.Type = `Charging ${ability.Name}`;
            this.ActivityProgressText.setText(`Charging ${ability.Name}`).setVisible(true);
            this.ActivityProgressBarBG.setVisible(true);
        } else if ( ability.ActiviationType == "Cast" ) {
            this.CurrentActivity.Delta = 0;
            this.ActivityProgressBar.setDisplaySize(0, 20);
            this.ActivityProgressBar.setVisible(true);
            this.CurrentActivity.Type = `Casting ${ability.Name}`;
            this.ActivityProgressText.setText(`Casting ${ability.Name}`).setVisible(true);
            this.ActivityProgressBarBG.setVisible(true);
        } else if ( ability.ActiviationType == "Instant" ) {
            // No progress bar, just perform the ability immediately
        } else {
            console.warn(`Unknown ability activation type: ${ability.ActiviationType}`);
        }

    }

    StartActivity( object: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Rectangle ) {

        console.log(object);

        if ( object == null ) return;
        if ( object.getData("type") == null || object.getData("type") == undefined ) return;

        const ObjectType = object.getData("type");
        console.log(ObjectType);
    
        if ( Phaser.Math.Distance.BetweenPoints(this.scene.PlayerCharacter, { x: object.getCenter().x, y: object.getCenter().y }) > 75 )
            return this.scene.UI.EventLog.NewEvent("That is too far away");
            
        this.CurrentActivity.Delta = 0;

        if ( ObjectType == "Willow Tree" ) {
            this.CurrentActivity.Type = "Cutting Willow Tree";
            this.scene.sound.play("woodcutting", { loop: true });
        } else if ( ObjectType == "Marigold" ) {
            this.CurrentActivity.Type = "Harvesting Marigold";
            this.scene.sound.play("harvesting", { loop: true });
        } else if ( ObjectType == "Munkle's Brightcap" ) {
            this.CurrentActivity.Type = "Harvesting Munkle's Brightcap";
            this.scene.sound.play("harvesting", { loop: true });
        } else if ( ObjectType == "Bloomberry" ) {
            this.CurrentActivity.Type = "Harvesting Bloomberry";
            this.scene.sound.play("harvesting", { loop: true });
        } else if ( ObjectType == "Stone Node" ) {
            this.CurrentActivity.Type = "Mining Stone";
            this.scene.sound.play("mining", { loop: true });
        } else if ( ObjectType == "Iron Node" ) {
            this.CurrentActivity.Type = "Mining Iron";
            this.scene.sound.play("mining", { loop: true });
        } else if ( ObjectType == "Fishing" ) {
            this.CurrentActivity.Type = "Fishing";
            this.scene.sound.play("fishing", { loop: true });
        } else {
            console.log("Activity not found");
        }
        
        this.scene.UI.EventLog.NewEvent(`You start ${this.CurrentActivity.Type}`);

        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(true);
        this.ActivityProgressText.setText(this.CurrentActivity.Type).setVisible(true);
        this.ActivityProgressBarBG.setVisible(true);

    }

    update ( delta: number ) {

        if ( this.CurrentActivity.Type == "" )
            return;

        this.CurrentActivity.Delta += delta;

        this.ActivityProgressBar.setDisplaySize( this.CurrentActivity.Delta / 1000 * 200, 20 );

        if ( this.CurrentActivity.IsAbility ) {

            const Ability = Abilities[this.CurrentActivity.AbilityID];

            // Invoke ability effects when we cross a channel interval threshold
            if ( Ability.hasOwnProperty("ChannelInterval") ) {

                const previousIntervals = Math.floor((this.CurrentActivity.Delta - delta) / Ability.ChannelInterval);
                const currentIntervals = Math.floor(this.CurrentActivity.Delta / Ability.ChannelInterval);

                if ( currentIntervals > previousIntervals ) {
                    console.log(`Applying channeled effect of ${Ability.Name}`);
                }

            }

            if ( Ability.hasOwnProperty("ChannelInterval") && this.CurrentActivity.Delta >= Ability.MaxChannelTime ) {
                console.log(`Max channel time reached for ${Ability.Name}, ending channel.`);
                this.CancelActivity();
                return;
            }

            if ( Ability.ActiviationType == "Charge" && this.CurrentActivity.Delta >= Ability.ChargeTime ) {
                console.log(`Max charge time reached for ${Ability.Name}, performing ability with max charge.`);
                // Perform the ability with max charge here (e.g. apply effects, deal damage, etc.)
                this.CancelActivity();
                return;
            }

            if ( Ability.ActiviationType == "Cast" && this.CurrentActivity.Delta >= Ability.CastTime ) {
                console.log(`Cast time completed for ${Ability.Name}, performing ability.`);
                // Perform the ability here (e.g. apply effects, deal damage, etc.)
                this.CancelActivity();
                return;
            }

            // Ability still in progress, wait for completion
            return;

        } else {

            if ( this.CurrentActivity.Delta < 1000 ) return;

            this.CurrentActivity.Delta = 0;
            this.ActivityProgressBar.setDisplaySize(0, 20);

            let ev = { message: "", sprite1: "", sprite2: 0, x: this.scene.PlayerCharacter.x, y: this.scene.PlayerCharacter.y };

            if ( this.CurrentActivity.Type == "Cutting Willow Tree" ) {
                ev.message = "+1 Willow Log";
                ev.sprite1 = "general";
                ev.sprite2 = 21;
                this.scene.Inventory.AddItem("log_willow", 1);
                GD.Skills['Forestry'].Experience += 5;
            } else if ( this.CurrentActivity.Type == "Harvesting Marigold" ) {
                ev.message = "+1 Marigold";
                ev.sprite1 = "flowers";
                ev.sprite2 = 32;
                this.scene.Inventory.AddItem("marigold", 1);
                GD.Skills['Botany'].Experience += 5;
            } else if ( this.CurrentActivity.Type == "Harvesting Munkle's Brightcap" ) {
                ev.message = "+1 Munkle's Brightcap";
                ev.sprite1 = "RA_Cavern_Full";
                ev.sprite2 = 902;
                //this.scene.Inventory.AddItem("munkles_brightcap", 1);
                GD.Skills['Botany'].Experience += 5;
            } else if ( this.CurrentActivity.Type == "Harvesting Bloomberry" ) {
                ev.message = "+1 Bloomberry";
                ev.sprite1 = "RA_Jungle";
                ev.sprite2 = 1179;
                //this.scene.Inventory.AddItem("bloomberry", 1);
                GD.Skills['Botany'].Experience += 5;
            } else if ( this.CurrentActivity.Type == "Mining Stone" ) {
                ev.message = "+1 Stone";
                ev.sprite1 = "general";
                ev.sprite2 = 60;
                //this.scene.Inventory.AddItem("stone_rough", 1);
                GD.Skills['Mining'].Experience += 5;
            } else if ( this.CurrentActivity.Type == "Mining Iron" ) {
                ev.message = "+1 Iron Ore";
                ev.sprite1 = "general";
                ev.sprite2 = 62;
                //this.scene.Inventory.AddItem("ore_iron", 1);
                GD.Skills['Mining'].Experience += 5;
            } else if ( this.CurrentActivity.Type == "Fishing" ) {
                ev.message = "+1 Humming Bass";
                ev.sprite1 = "fishing";
                ev.sprite2 = 333;
                //this.scene.Inventory.AddItem("humming_bass", 1);
                GD.Skills['Fishing'].Experience += 5;

            } else if ( this.CurrentActivity.Type == "Reloading" ) {
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
                if ( !Match ) console.log("No ammo!");;
                
            }

            if ( this.CurrentActivity.Type != "Reloading" ) {
                this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, ev));
                return;
            }

            this.CancelActivity();

        }

    }

    CancelActivity () {
        if ( this.CurrentActivity.Type != "Reloading" ) {
            this.scene.UI.EventLog.NewEvent(`You stop ${this.CurrentActivity.Type}`);
        }
        this.CurrentActivity = { Type: "", Delta: 0, IsAbility: false, AbilityID: null };
        this.scene.sound.stopByKey("woodcutting");
        this.scene.sound.stopByKey("mining");
        this.scene.sound.stopByKey("harvesting");
        this.ActivityProgressBar.setDisplaySize(0, 20);
        this.ActivityProgressBar.setVisible(false);
        this.ActivityProgressText.setVisible(false);
        this.ActivityProgressBarBG.setVisible(false);
    }

}