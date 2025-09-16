import AbilityData from "../data/Character/Abilities";
import UI from "../scenes/UI";

export default class Tooltip extends Phaser.GameObjects.Rectangle {

    public scene: UI;
    public Header: Phaser.GameObjects.Text;
    public Text: Phaser.GameObjects.Text;

    constructor ( scene: UI ) {
        super(scene, 0, 0, 200, 300, 0x242424, 1);
        this.scene = scene;
        this.setOrigin(0, 0).setStrokeStyle(2, 0xffffff, 1).setVisible(false);
        this.Header = this.scene.add.text( this.getTopLeft().x + 5, this.getTopLeft().y + 5, `Tooltip`, { fontFamily: "Augusta", fontSize: 24, wordWrap: { useAdvancedWrap: true, width: this.width - 10 } }).setVisible(false);
        this.Text = this.scene.add.text( this.Header.getBottomLeft().x + 5, this.Header.getBottomLeft().y + 12, `Tooltip Text`, { fontFamily: "Augusta", fontSize: 18, wordWrap: { useAdvancedWrap: true, width: this.width - 5 } }).setVisible(false);
        this.scene.add.existing(this);
        this.scene.add.existing(this.Header);
        this.scene.add.existing(this.Text);
        this.setDepth(20000);
        this.Text.setDepth(20001);
        this.Header.setDepth(20001);
    }

    Move ( x: number, y: number ) {
        this.setPosition(x, y);
        this.Header.setPosition(this.getTopLeft().x + 5, this.getTopLeft().y + 5);
        this.Text.setPosition(this.Header.getBottomLeft().x + 5, this.Header.getBottomLeft().y + 12);
    }

    public Show ( Type: string, ID: string ) {

        if ( Type == "Item" ) {
            let ItemData = this.scene.Game.DataManager.GetItemData(ID);
            // Append any custom item data in the GD.Inventory
            this.Header.setText(ItemData.Name);
            this.Text.setText(ItemData.Desc);
        }

        if ( Type == "Ability" ) {
            const BaseAbilityData = AbilityData[ID];
            this.Header.setText(BaseAbilityData.name);
            this.Text.setText(BaseAbilityData.description);
        }

        this.Header.setPosition(this.getTopLeft().x + 5, this.getTopLeft().y + 5);
        this.Text.setPosition(this.Header.getBottomLeft().x + 5, this.Header.getBottomLeft().y + 12);

        this.setVisible(true);
        this.Header.setVisible(true);
        this.Text.setVisible(true);
    }

    public Hide () {
        this.setVisible(false);
        this.Header.setVisible(false);
        this.Text.setVisible(false);
    }

}