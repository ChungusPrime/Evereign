import Game from "../scenes/Game";
import { GD } from "../scenes/Game";
import Obstacle from "./Obstacle";

export default class Switch extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public ID: number;

    constructor ( scene: Game, x: number, y: number, id: number, sheet: string, frame: number ) {

        super( scene, x, y, sheet, frame );

        this.ID = id;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0, 1);
        this.setImmovable(true);
        this.setPipeline("Light2D");

        let ObjectData = this.scene.DataManager.GetObjectData(id);
        console.log(ObjectData);

        let StaticData = this.scene.DataManager.MapData[GD.CurrentMap].Objects.find( (object) => object.ID == this.ID );
        console.log(StaticData);

        this.setInteractive().on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {

            if ( StaticData.RequiresItem !== undefined ) {
                const item = this.scene.Inventory.Items.find( (item) => item.getData('ItemID') == StaticData.RequiresItem );
                if ( item == undefined ) {
                    return this.scene.UI.EventLog.NewEvent("You do not have the item required to activate this");
                }
            }

            let ObjectData = this.scene.DataManager.GetObjectData(id);
            ObjectData.Active = !ObjectData.Active;
            console.log(ObjectData);

            this.scene.Obstacles.getChildren().forEach( (obstacle: Obstacle) => {
                obstacle.CheckForActivatedSwitches();
            });

        });

        return this;
    }

}