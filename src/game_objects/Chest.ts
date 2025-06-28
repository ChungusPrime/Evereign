import Game from "../scenes/Game";
import { GD } from "../scenes/Game";

export default class Chest extends Phaser.GameObjects.Sprite {

    public scene: Game;
    public ID: number;

    constructor ( scene: Game, x: number, y: number, id: number ) {

        super( scene, x, y, 'RA_Interior', 738 );

        this.scene.add.existing(this);
        this.ID = id;
        this.setOrigin(0, 1);

        this.setDepth(99).setInteractive().on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {

            if ( this.scene.PlayerCharacter.PlayerIsDead || !pointer.rightButtonDown() ) {
                return;
            }

            if ( Phaser.Math.Distance.BetweenPoints(this.scene.PlayerCharacter, this) > 75 ) {
                return this.scene.UI.EventLog.NewEvent("That is too far away");
            }

            if ( GD.WorldData[GD.CurrentMap][this.ID].Unlocked == true ) {
                return this.scene.UI.LootWindow.Show(id);
            }

            // Check if chest needs a key
            let StaticData = this.scene.DataManager.MapData[GD.CurrentMap][this.ID];
            if ( StaticData.RequiresItem !== undefined ) {
                const item = this.scene.Inventory.Items.find( (item) => item.getData('ItemID') == StaticData.RequiresItem );
                if ( item == undefined ) {
                    return this.scene.UI.EventLog.NewEvent("You dont have the required item to unlock this chest");
                } else {
                    this.scene.UI.EventLog.NewEvent(`You unlock the chest with ${item.name}`);
                    let Chest = GD.WorldData[GD.CurrentMap][this.ID];
                    Chest.Unlocked = true;
                }
            }
            
        });

        return this;

    }

}