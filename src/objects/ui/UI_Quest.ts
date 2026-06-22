import UI from "../../scenes/UI";
import { GD } from "../../scenes/Game";

export default class UI_Quest extends Phaser.GameObjects.Rectangle {

    public Data: QuestData;
    public ID: string;
    public Text: Phaser.GameObjects.Text;
    public Description: Phaser.GameObjects.Text;
    public UnlockStatus: Phaser.GameObjects.Text;

    constructor ( scene: UI, x: number, y: number, width: number, quest: QuestData ) {

        super( scene, x, y, width, 100, 0x102430, 1);

        this.ID = quest.ID;
        this.Data = quest;

        this.setOrigin(0, 0)
        .setVisible(false)
        .setInteractive()
        .on('pointerover', () => {

        })
        .on('pointerout', () => {

        })
        .on('pointerdown', () => { 
            console.log(quest) 
        });

        this.scene.add.existing(this);

        this.Text = scene.add.text(this.getTopLeft().x + 3, this.getTopLeft().y + 3, quest.Name, {
            fontFamily: "Augusta",
            fontSize: 16,
            wordWrap: { 
                useAdvancedWrap: true,
                width: this.width - 6
            }
        })
        .setVisible(false);

        this.Description = scene.add.text(this.Text.getBottomLeft().x, this.Text.getBottomLeft().y + 12, quest.Description, {
            fontFamily: "Augusta",
            fontSize: 14,
            wordWrap: { 
                useAdvancedWrap: true,
                width: this.width - 6
            }
        }).setVisible(false);

        this.UnlockStatus = scene.add.text(this.Description.getBottomLeft().x, this.Description.getBottomLeft().y + 12, "Completed: No", {
            fontFamily: "Augusta",
            fontSize: 14,
            wordWrap: { 
                useAdvancedWrap: true,
                width: this.width - 6
            }
        }).setVisible(false);

        /*if ( GD.Que.Completed == true ) 
            this.UnlockStatus.setText("Completed: Yes");*/
        
        return this;
    }

}