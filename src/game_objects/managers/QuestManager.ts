import Game, { GD } from "../../scenes/Game";
import UI from "../../scenes/UI";
import QuestData from "../../data/QuestData";

export default class QuestManager {

    public Game: Game;
    public UI: UI;

    /** Text buttons representing active quests, when clicked will open a specific page for that quest */
    public ActiveQuestButtons: Phaser.GameObjects.Text[] = [];

    /** Text objects representing the current quest being viewed */
    public QuestViewItems: any[] = [];

    constructor ( scene: Game ) {
        this.Game = scene;
        this.UI = this.Game.UI;
        GD.Quests.forEach( (quest) => this.CreateQuestLogEntry(quest.ID));
    }

    // Add the quest to the player's quest log
    GrantQuest ( id: string ) {
        const QD = QuestData[id];
        this.Game.UI.EventLog.NewEvent(`Quest Accepted: ${QD.Name}`);
        GD.Quests.push({
            ID: id,
            ReadyToHandIn: false,
            Completed: false,
            ObjectiveProgress: QD.Objectives.map((objective, index) => ({
                Step: index,
                Progress: 0,
                Completed: false,
                Visible: true
            }))
        });
        this.CreateQuestLogEntry(id);
    }

    public CreateQuestLogEntry (id: string) {
        const QD = QuestData[id];
        let elem = this.UI.add.text(0, 0, QD.Name, { fontFamily: "Augusta", fontSize: 24 })
        .setOrigin(0.5, 0)
        .setDepth(100)
        .setTint(0x000000)
        .setVisible(false)
        .setInteractive()
        .on('pointerdown', () => this.ShowQuest(id));
        elem.setData('QuestID', id)
        this.ActiveQuestButtons.push(elem);
    }

    /**
     * @param QuestID The ID of the quest to update
     * @param Step The index of the objective to update
     */
    UpdateQuest ( QuestID: string, Step: number ) {

        console.log(QuestID, Step);

        // Get the static data for the quest
        const QD = QuestData[QuestID];

        // Get the players current quest progress
        let CurrentQuestProgress = GD.Quests.find( (quest) => quest.ID == QuestID );

        // Find the step we want to update, then increment its progess
        let CurrentStepProgress = CurrentQuestProgress.ObjectiveProgress.find( (objective) => objective.Step == Step );
        CurrentStepProgress.Progress++;

        // Check if objective has been completed after incrementing
        if ( CurrentStepProgress.Progress >= QD.Objectives[Step].ProgressNeeded ) {
            CurrentStepProgress.Completed = true;
        }

        // Check if all objectives have been completed, if so set the quest to ready to hand in
        if ( CurrentQuestProgress.ObjectiveProgress.every( (objective) => objective.Completed == true ) ) {
            console.log("Quest ready for hand in");
            CurrentQuestProgress.ReadyToHandIn = true;
        }

    }

    CompleteQuest ( QuestID: string ): boolean {

        // Find quest in Game Data
        let Quest = GD.Quests.find( (quest) => quest.ID == QuestID );
        if ( Quest.ReadyToHandIn == false ) return false;

        // Find the static data for the quest
        const QD = QuestData[QuestID];

        // Add rewards to player inventory
        QD.Rewards.forEach( (reward) => {
            //this.Game.Inventory.AddItem(reward, 1, false);
        });

        // Set quest to completed
        Quest.Completed = true;

        // Log the event
        this.Game.UI.EventLog.NewEvent(`Quest Completed: ${QuestData.Name}`);

        // Remove the quest from the active quests
        this.ActiveQuestButtons.forEach( (element) => {
            if ( element.getData('QuestID') == Quest.ID ) {
                this.ActiveQuestButtons = this.ActiveQuestButtons.filter( (quest) => quest.getData('QuestID') != Quest.ID );
                element.destroy();
            }
        });

        return true;
    }

    ShowQuestLog () {
        console.log(GD.Quests);
        this.UI.ActiveQuestsHeader.setVisible(true);
        let X = this.UI.ActiveQuestsHeader.getTopCenter().x;
        let Y = this.UI.ActiveQuestsHeader.getTopCenter().y + 48;
        this.ActiveQuestButtons.forEach( (Quest: Phaser.GameObjects.Text) => {
            Quest.setVisible(true);
            Quest.setPosition(X, Y);
            Y += Quest.height + 10;
        });
    }

    HideQuestLog () {
        this.UI.ActiveQuestsHeader.setVisible(false);
        this.ActiveQuestButtons.forEach( (element) => {
            element.setVisible(false);
        });
    }

    ShowQuest (id: string) {

        console.log(id);
        this.HideQuestLog();

        const QD = QuestData[id];
        let Quest = GD.Quests.find( (quest) => quest.ID == id );

        let ObjectiveListX = this.UI.QuestObjectivesHeader.getBottomCenter().x;
        let ObjectiveListY = this.UI.QuestObjectivesHeader.getBottomCenter().y + 24;

        this.UI.QuestObjectivesHeader.setVisible(true);
        this.UI.QuestInformationHeader.setVisible(true);

        Quest.ObjectiveProgress.forEach( (objective, index) => {
            let Text = QD.Objectives[objective.Step].Text + " (" + objective.Progress + "/" + QD.Objectives[objective.Step].ProgressNeeded + ")";
            if ( objective.Visible == false ) return;
            let ObjectiveText = this.UI.add.text(ObjectiveListX, ObjectiveListY, Text, { 
                fontFamily: "Augusta",
                fontSize: 24,
                wordWrap: { 
                    width: this.UI.LeftBackground.width - 20,
                    useAdvancedWrap: true
                }
            });
            ObjectiveText.setOrigin(0.5);
            ObjectiveText.setTint(0x000000);
            ObjectiveText.setVisible(Quest.ObjectiveProgress[index].Visible);
            ObjectiveListY += ObjectiveText.height + 48;
            this.QuestViewItems.push(ObjectiveText);
        });

    }

    HideQuestView () {
        this.QuestViewItems.forEach( (element) => {
            element.destroy();
        });
    }

}