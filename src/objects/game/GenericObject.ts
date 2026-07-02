import { CMD } from "../../scenes/Game";
import { GD } from "../../scenes/Game";
import ObjectData from "../../data/ObjectData";
import Game from "../../scenes/Game";

class GenericObject extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public ID: number | null = null;
    public Alive: boolean = true;
    public RespawnTime: number = 0;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject ) {
        super(scene, object.x, object.y, ObjectData[object.type].FloatSprite ?? "placeholder", ObjectData[object.type].FloatFrame ?? 0);
        this.setOrigin(0, 1).setLighting(true).setDepth(100).setImmovable(true);

        if ( object.flippedHorizontal )
            this.setFlipX(true);

        this.ID = object.properties?.[0]?.value ?? null;

        if ( this.ID !== null ) {
            // Check if the object has stored persistance data for this character

            // Check if the object's ID is unique in the world, 
            // and if so, load its data from the world data
        }

        if ( ObjectData[object.type].IsLightSource ) {
            let lightColor = ObjectData[object.type].LightColor ?? 0xffffff;
            let lightRadius = ObjectData[object.type].LightRadius ?? 100;
            let lightIntensity = ObjectData[object.type].LightIntensity ?? 1;
            this.scene.lights.addLight(this.x, this.y, lightRadius, lightColor, lightIntensity);
        }

        if ( ObjectData[object.type].IsInteractive ) {
            this.setInteractive();
            scene.ActionManager.StartHarvesting(this);
        }

        if ( ObjectData[object.type].IsHarvestable ) {
            this.setData("type", ObjectData[object.type].Name);
            this.setData("tiled_id", object.id);
        }

        if ( ObjectData[object.type].Loot ) {
            // Get loot from persistant map data
        }

        if ( ObjectData[object.type].RespawnTime ) {
            this.RespawnTime = ObjectData[object.type].RespawnTime;
        }

        if ( ObjectData[object.type].BodySize ) {
            this.setBodySize(ObjectData[object.type].BodySize.width, ObjectData[object.type].BodySize.height);
        }

        if ( ObjectData[object.type].BodyOffset ) {
            this.body.setOffset(ObjectData[object.type].BodyOffset.x, ObjectData[object.type].BodyOffset.y);
        }

        this.scene = scene;
        this.scene.add.existing(this);

        return this;
    }

    Deplete () {
        CMD.DepletedHarvestables.push(this.getData("tiled_id"));
        this.setFrame(2);
        this.Alive = false;
        this.RespawnTime = 10;
    }

    Regenerate () {
        CMD.DepletedHarvestables = CMD.DepletedHarvestables.filter( id => id != this.getData("tiled_id") );
        this.setFrame(0);
        this.Alive = true;
        this.RespawnTime = 0;
    }

}



export default GenericObject;