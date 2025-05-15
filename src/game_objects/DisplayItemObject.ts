import UI from "../scenes/UI";

export default class DisplayItemObject extends Phaser.GameObjects.Sprite {

    public scene: UI;
    public quantity: Phaser.GameObjects.Text;
    public CurrentSlot: Phaser.GameObjects.NineSlice;
    public stackable: boolean;

    constructor (scene: UI, x: number, y: number, texture: string, frame: string, stackable: boolean) {

        super( scene, x, y, texture, frame );

        this.scene = scene;
        this.stackable = stackable;

        this.scene.add.existing(this);
        this.setInteractive({ draggable: true });

        this.quantity = this.scene.add.text(this.getBottomRight().x, this.getBottomRight().y, "x0", { 
            fontFamily: "Augusta",
            fontSize: 12 
        })
        .setOrigin(1, 1)
        .setVisible(false);

        this.scene.add.existing(this.quantity);

        if ( this.stackable == false ) {
            this.quantity.setAlpha(0);
        }

        this.scene.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: DisplayItemObject) => {
            if ( gameObject !== this ) return;
            this.quantity.setVisible(false);
            this.scene.Tooltip.Hide();
        });

        this.scene.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: DisplayItemObject, dragX: number, dragY: number) => {
            if ( gameObject !== this ) return;
            this.x = dragX;
            this.y = dragY;
        });

        this.scene.input.on('dragenter', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, slot: Phaser.GameObjects.NineSlice) => {
            slot.setTint(0x00ff00);
        });
    
        this.scene.input.on('dragleave', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, slot: Phaser.GameObjects.NineSlice) => {
            if ( gameObject !== this ) return;
            slot.clearTint();
        });

        this.scene.input.on('drop', (pointer: Phaser.Input.Pointer, gameObject: DisplayItemObject, slot: Phaser.GameObjects.NineSlice) => {
            if ( gameObject !== this ) return;
            if ( slot.getData("Item") !== null ) {
                slot.clearTint();
                this.x = this.CurrentSlot.getCenter().x;
                this.y = this.CurrentSlot.getCenter().y;
                this.quantity.setVisible(true);
                return;
            }
            console.log(slot);
            gameObject.x = slot.getCenter().x;
            gameObject.y = slot.getCenter().y;
            this.CurrentSlot.setData("Item", null);
            this.CurrentSlot = slot;
            slot.clearTint().setData("Item", this);
            this.quantity.setPosition(this.getBottomRight().x, this.getBottomRight().y);
            console.log(this.data);
            console.log(this.CurrentSlot.data);
        });

        this.scene.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: DisplayItemObject, dropped: boolean) => {
            if ( gameObject !== this ) return;
            if ( !dropped ) {
                this.x = this.CurrentSlot.getCenter().x;
                this.y = this.CurrentSlot.getCenter().y;
            }
            this.quantity.setVisible(true);
        });

        return this;

    }

    delete () {
        this.quantity.destroy();
        this.destroy();
    }

}