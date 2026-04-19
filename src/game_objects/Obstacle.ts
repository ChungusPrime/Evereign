import Game from "../scenes/Game";
import { GD } from "../scenes/Game";

export default class Obstacle extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public ID: number;
    public StaticData;
    public ObjectData;

    constructor ( scene: Game, x: number, y: number, id: number, sheet: string, frame: number ) {

        super( scene, x, y, sheet, frame );

        this.ID = id;
        this.StaticData = this.scene.DataManager.MapData[GD.CurrentMap][this.ID];
        this.ObjectData = this.scene.DataManager.GetObjectData(id);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0, 1);
        this.setImmovable(true);
        this.setLighting(true);

        if ( this.ObjectData.Active == false ) {
            this.setVisible(false);
            this.setActive(false);
            this.disableBody();
        } else {
            this.setVisible(true);
            this.setActive(true);
        }

        return this;
    }

    Destroy () {
        GD.WorldData[GD.CurrentMap][this.ID].Active = false;
        this.setVisible(false);
        this.setActive(false);
        this.disableBody();
    }

    // Check if all required switches to hide this obstacle have been activated
    CheckForActivatedSwitches () {

        let RequiredSwitches = this.StaticData.RequiresActivatedSwitches;

        if ( RequiredSwitches == undefined ) return;

        console.log(RequiredSwitches.length);

        let ActiveSwitchCount = 0;
        this.StaticData.RequiresActivatedSwitches.forEach( (switchID: number) => {
            if ( this.scene.DataManager.GetObjectData(switchID).Active == true )
                ActiveSwitchCount++;
        });

        if ( ActiveSwitchCount == RequiredSwitches.length ) {
            this.setVisible(false);
            this.setActive(false);
            this.disableBody();
            let ObjectData = this.scene.DataManager.GetObjectData(this.ID);
            ObjectData.Active = false;
        } else {
            this.setVisible(true);
            this.setActive(true);
            this.enableBody();
            let ObjectData = this.scene.DataManager.GetObjectData(this.ID);
            ObjectData.Active = true;
        }

    }

}