import Game, { GD } from "../../scenes/Game";

/** When the players enters this zone, do something then destroy */
export default class TriggerZone extends Phaser.GameObjects.Rectangle {

    public scene: Game;
    public ID: any;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject, isPlayerOwned: boolean = false ) {

        super( scene, object.x, object.y, 128, 128, 0xff0000, 0 );

        this.scene = scene;

        this.setOrigin(0, 0).setInteractive();

        this.ID = object.properties[0].value;

        console.log(this.ID);

        this.scene.physics.add.overlap(this, this.scene.PlayerCharacter, () => {

            let TriggerData = this.scene.DataManager.MapData[GD.CurrentMap][this.ID];

            console.log(TriggerData);

            if ( TriggerData.QuestProgressID ) {
                this.scene.QuestManager.UpdateQuest(TriggerData.QuestProgressID, TriggerData.QuestProgressStep);
            }

            if ( TriggerData.QuestUnlockStep ) {
                let Quest = GD.Quests.find((quest) => quest.ID == TriggerData.QuestProgressID);
                Quest.ObjectiveProgress[TriggerData.QuestUnlockStep].Visible = true;
            }

            if ( TriggerData.StartDialogue ) {
                this.scene.UI.DialogueWindow.ShowSubject(TriggerData.StartDialogue, TriggerData.DialogueSubject);
            }

            GD.WorldData[GD.CurrentMap][this.ID].Active = false;

            this.destroy();
        });

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);

        let savedData = GD.WorldData[GD.CurrentMap][this.ID];

        if ( !savedData ) {
            return;
        }

        if ( savedData.Active == false ) {
            this.destroy();
        }

    }

}