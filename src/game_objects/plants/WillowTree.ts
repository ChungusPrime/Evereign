import Game, { CMD } from "../../scenes/Game";

export default class WillowTree extends Phaser.Physics.Arcade.Sprite {

    Alive = true;
    RespawnTime = 0;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject ) {
        super( scene, object.x, object.y, "WillowTree", 0);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(object.width, object.height)
        .setData("type", "Willow Tree")
        .setData("tiled_id", object.id)
        .setLighting(true)
        .setDepth(100)
        .setBodySize(30, 60)
        .setImmovable(true)
        .setInteractive()
        .on('pointerdown', () => {
            console.log(this);
            if ( !this.Alive ) return;
            scene.ActionManager.StartActivity(this);
        });
        this.body.setOffset(80, 120);
        scene.Trees.add(this);
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