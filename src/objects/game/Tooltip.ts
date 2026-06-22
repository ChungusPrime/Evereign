import Proficiencies from "../../data/Proficiencies";
import ItemData from "../../data/ItemData";
import UI from "../../scenes/UI";
import BBCodeText from 'phaser4-rex-plugins/plugins/bbcodetext.js';
import DamageTypes from "../../data/DamageTypes";

export default class Tooltip extends Phaser.GameObjects.Rectangle {

    public scene: UI;
    public Header: Phaser.GameObjects.Text;
    public Text: BBCodeText;

    constructor ( scene: UI ) {
        super(scene, 0, 0, 200, 300, 0x242424, 1);
        this.scene = scene;
        this.setOrigin(0, 0).setStrokeStyle(2, 0xffffff, 1).setVisible(false);
        this.Header = this.scene.add.text( this.getTopLeft().x + 5, this.getTopLeft().y + 5, `Tooltip`, { fontFamily: "Augusta", fontSize: 24, wordWrap: { useAdvancedWrap: true, width: this.width - 10 } }).setVisible(false);
        this.Text = new BBCodeText(this.scene, this.Header.getBottomLeft().x + 5, this.Header.getBottomLeft().y + 12, `Tooltip Text`, { fontFamily: "Augusta", fontSize: 18, wordWrap: { width: this.width - 5 } }).setVisible(false);
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
            const BaseItemData = ItemData[ID];
            // Append any custom item data in the GD.Inventory
            this.Header.setText(BaseItemData.Name);

            let text = BaseItemData.Desc;

            if ( BaseItemData.Category == "Ammunition" ) {

                Object.entries(BaseItemData.Properties).forEach( ([key, property]: [string, any]) => {

                    if ( key == "Pellets" ) {
                        text += `\nPellets per shot: [color=yellow]${BaseItemData.Properties.Pellets}[/color]`;
                    }

                    if ( key == "DamageMod" ) {
                        text += `\n\nDamage per pellet:`;
                        BaseItemData.Properties.DamageMod.forEach( (mod: any) => {
                            if ( mod.Value ) {
                                text += `\n - ${mod.Type}: ${mod.Value}`;
                            } else {
                                text += `\n - ${mod.Type}: ${mod.Min}-${mod.Max}`;
                            }
                        });
                    }



                });
            }

            // Replace damage type names with their colours
            Object.entries(DamageTypes).forEach( ([key, type]) => {
                text = text.replace(key, `[color=${type}]${key}[/color]`);
            });

            this.Text.setText(text);
        }

        if ( Type == "Ability" ) {
            //const BaseAbilityData = Proficiencies[ID];
            //this.Header.setText(BaseAbilityData.name);
            //this.Text.setText(BaseAbilityData.description);
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