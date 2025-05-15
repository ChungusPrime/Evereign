import Game, { GD } from "../../scenes/Game";

/** When the players enters this zone, do something then destroy */
export default class TriggerZone extends Phaser.GameObjects.Rectangle {

    public scene: Game;

    constructor ( scene: Game, x: number, y: number, width: number, height: number, id: number ) {

        super( scene, x, y, width + 6, height + 6, 0xff0000, 0.75 );
        this.scene = scene;

        this.setOrigin(0, 0);
        this.setData('Type', "Trigger");
        this.setData('ID', id);
        this.setInteractive();

        this.scene.physics.add.overlap(this, this.scene.PlayerCharacter, () => {
            // Get trigger data
            const TriggerData = this.scene.DataManager.MapData[GD.CurrentMap].Zones.find( (zone) => zone.ID == id );

            if ( TriggerData.QuestProgressID ) {
                this.scene.QuestManager.UpdateQuest(TriggerData.QuestProgressID, TriggerData.QuestProgressStep);
            }

            if ( TriggerData.QuestUnlockStep ) {
                let Quest = GD.Quests.find((quest) => quest.ID == TriggerData.QuestProgressID);
                Quest.ObjectiveProgress[TriggerData.QuestUnlockStep].Visible = true;
            }

            GD.Maps[GD.CurrentMap].Objects.find( (zone) => zone.ID == id ).Active = false;

            this.destroy();
        });

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);

        let savedData = GD.Maps[GD.CurrentMap].Objects.find( (zone) => zone.ID == id );

        if ( !savedData ) {
            return;
        }

        if ( savedData.Active == false ) {
            this.destroy();
        }

    }

}