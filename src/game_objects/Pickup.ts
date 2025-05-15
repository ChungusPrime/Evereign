import Game from "../scenes/Game";

export default class Pickup extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public ItemID: string;
    public ItemQuantity: number;

    constructor ( scene: Game, x: number, y: number, texture: string, frame: number, itemID: string, itemQuantity: number, droppedByEnemy: boolean = false ) {

        super( scene, x, y, texture, frame );
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.ItemID = itemID;
        this.ItemQuantity = itemQuantity;

        this.scene.Pickups.add(this);

        if ( droppedByEnemy == true ) {
            this.setVelocity(Phaser.Math.Between(-25, 25), Phaser.Math.Between(-25, 25));
            this.setDrag(0.2);
            this.setAngularDrag(5);
            this.setDamping(true);
        }
        
        this.scene.physics.add.overlap(this, this.scene.PlayerCharacter, (pickup, PlayerCharacter) => {
            this.scene.Inventory.AddItem(this.ItemID, this.ItemQuantity);
            this.scene.Pickups.remove(this, true, true);
        });

    }
    
}