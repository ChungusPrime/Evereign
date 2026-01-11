import { GD } from "../scenes/Game";
import UI from "../scenes/UI";
import Obstacle from "./Obstacle";
import DD from "../data/DialogueData";

export default class DialogueWindow {

    public scene: UI;
    public DialogueCamera!: Phaser.Cameras.Scene2D.Camera;
    public Background: Phaser.GameObjects.NineSlice
    public Text: Phaser.GameObjects.Text;
    public DialogueLayer: Phaser.GameObjects.Layer;
    public CurrentDialogueKey: string = "";

    // Player Character
    CharacterPortraitBackground: Phaser.GameObjects.Rectangle;
    CharacterHead: Phaser.GameObjects.Sprite;
    CharacterBody: Phaser.GameObjects.Sprite;
    CharacterDetail: Phaser.GameObjects.Sprite;
    CharacterName: Phaser.GameObjects.Text;

    // The Character the player is talking to
    OtherPotraitBackground: Phaser.GameObjects.Rectangle;

    constructor ( scene: UI ) {

        this.scene = scene;
        this.DialogueLayer = this.scene.add.layer();

        this.Background = this.scene.add.nineslice( this.scene.Game.cameras.main.width / 2, this.scene.Game.cameras.main.height / 2, "Kenney-UI", "panel_beige", this.scene.scale.width * 0.3, this.scene.scale.height * 0.6, 10, 10, 10, 10)
        .setOrigin(0.5, 0.5)
        .setInteractive().on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            console.log(pointer.deltaY);
            this.DialogueCamera.scrollY += (pointer.deltaY * 0.1);
        });

        this.DialogueCamera = this.scene.cameras.add(
            this.Background.getTopLeft().x,
            this.Background.getTopLeft().y + 16,
            this.Background.width,
            this.Background.height - 32,
            false,
            "DialogueWindowCamera"
        )
        .setBounds(this.Background.getTopLeft().x, this.Background.getTopLeft().y, this.Background.width, this.Background.height)
        .setVisible(false);

        this.Text = this.scene.add.text(this.Background.getTopLeft().x + 8, this.Background.getTopLeft().y + 4, "Placeholder", {
            fontFamily: "Augusta",
            fontSize: 24,
            wordWrap: { 
                useAdvancedWrap: true, 
                width: this.Background.width - 16
            },
            color: "#000000"
        });

        this.CharacterPortraitBackground = this.scene.add.rectangle(this.Background.getTopLeft().x - 5, this.Background.getTopLeft().y, 100, 100, 0x000000, 0.9)
        .setOrigin(1, 0)
        .setStrokeStyle(1, 0xffffff);

        let BC = this.CharacterPortraitBackground.getTopCenter();
        this.CharacterHead = this.scene.add.sprite(BC.x, BC.y, "Head", 40).setOrigin(0.5, 0).setDisplaySize(81, 81);
        this.CharacterDetail = this.scene.add.sprite(BC.x, BC.y, "Detail", 68).setOrigin(0.5, 0).setDisplaySize(81, 81);
        this.CharacterName = this.scene.add.text(BC.x, BC.y + 81, "{PlayerName}", { fontFamily: "Augusta", fontSize: 18 }).setOrigin(0.5, 0);

        this.OtherPotraitBackground = this.scene.add.rectangle(this.Background.getTopRight().x + 5, this.Background.getTopRight().y + 5, 100, 100, 0x000000, 0.9)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0xffffff);

        this.DialogueLayer.add([
            this.Background,
            this.CharacterPortraitBackground,
            this.CharacterHead,
            this.CharacterDetail,
            this.CharacterName,
            this.OtherPotraitBackground,
        ]);

        this.DialogueLayer.setVisible(false);

    }

    ShowSubject ( key: string, subject: string ) {

        console.log(key, subject);

        this.scene.CurrentJournalPage = "Dialogue";

        this.DialogueCamera.setScroll(0, 0);

        this.CurrentDialogueKey = key;

        const DialogueData = DD[key].Subjects[subject];

        this.Text.setText(DialogueData.Text).setPosition(this.Background.getTopLeft().x + 8, this.Background.getTopLeft().y + 8);

        let Responses: Phaser.GameObjects.Text[] = [];

        let Y = this.Text.getBottomLeft().y + 24;
        let TotalHeight = this.Text.height;

        DialogueData.Responses?.forEach((response, index) => {

            let DialogueButtonText = this.scene.add.text(this.Text.getBottomLeft().x, Y, `> ${response.Text}`, {
                fontFamily: "Augusta",
                fontSize: 24,
                wordWrap: {
                    useAdvancedWrap: true, 
                    width: this.Background.width - 6
                }
            })
            .setInteractive()
            .on("pointerover", () => DialogueButtonText.setColor("#ff0000"))
            .on("pointerout", () => DialogueButtonText.setColor("#ffffff"))

            .on('pointerdown', () => {

                GD.DialogueFlags.push(response.Flag);

                this.Hide();

                console.log(response);

                if ( response.GrantQuest ) {
                    this.scene.Game.QuestManager.GrantQuest(response.GrantQuest);
                }

                if ( response.EndDialogue ) {
                    Responses.forEach((response: Phaser.GameObjects.Text) => response.destroy());
                    this.scene.CurrentJournalPage = null;
                }

                if ( response.GoToMain ) {
                    Responses.forEach((response: Phaser.GameObjects.Text) => response.destroy());
                    this.StartConversation(this.CurrentDialogueKey);
                }

                if ( response.GoToSubject ) {
                    Responses.forEach((response: Phaser.GameObjects.Text) => response.destroy());
                    this.ShowSubject(this.CurrentDialogueKey, response.GoToSubject);
                }

                if ( response.DestroyObstacles ) {
                    response.DestroyObstacles.forEach((obstacleID: number) => {
                        let Obstacle = this.scene.Game.Obstacles.getChildren().find((obstacle: Obstacle) => obstacle.ID == obstacleID) as Obstacle;
                        if ( Obstacle != undefined ) {
                            Obstacle.Destroy();
                        }
                    });
                }

            });

            Responses.push(DialogueButtonText);
            Y += DialogueButtonText.height + 5;
            TotalHeight += DialogueButtonText.height + 50;
            this.scene.cameras.main.ignore(DialogueButtonText);

        });

        this.DialogueCamera.setBounds(this.Background.getTopLeft().x, this.Background.getTopLeft().y, 400, TotalHeight + 25).setVisible(true);
        this.DialogueLayer.setVisible(true);
    }

    StartConversation (person: string) {

        console.log(person);

        this.scene.CurrentJournalPage = "Dialogue";

        this.DialogueCamera.setScroll(0, 0);

        this.CurrentDialogueKey = person;

        const Person = DD[person];

        if ( GD.MetNPCs.includes(person) == false ) {
            this.Text.setText(Person.FirstTimeGreeting).setPosition(this.Background.getTopLeft().x + 8, this.Background.getTopLeft().y + 8);
            GD.MetNPCs.push(person);
        } else {
            this.Text.setText(Person.NormalGreeting).setPosition(this.Background.getTopLeft().x + 8, this.Background.getTopLeft().y + 8);
        }

        let Subjects: Phaser.GameObjects.Text[] = [];

        let TotalHeight = this.Text.height;
        let Y = this.Text.getBottomLeft().y + 10;

        // Iterate over the Subjects object
        for ( const key in Person.Subjects ) {

            if ( Person.Subjects[key].Hidden ) continue;

            if ( Person.Subjects[key].HideIfOnQuest ) {
                let Quest = GD.Quests.find((quest) => quest.ID == Person.Subjects[key].HideIfOnQuest);
                if ( Quest != undefined ) continue;
            }
            
            if ( Person.Subjects[key].RequiresQuest ) {
                let Quest = GD.Quests.find((quest) => quest.ID == Person.Subjects[key].RequiresQuest);
                if ( Quest == undefined ) continue;
            }

            let SubjectText = this.scene.add.text(this.Text.getBottomLeft().x, Y, `> ${key}`, {
                fontFamily: "Augusta",
                fontSize: 24,
                wordWrap: {
                    useAdvancedWrap: true, 
                    width: this.Background.width - 6
                }
            })
            .setInteractive()
            .on("pointerover", () => SubjectText.setColor("#ff0000"))
            .on("pointerout", () => SubjectText.setColor("#ffffff"))
            .on('pointerdown', () => {

                console.log(Person.Subjects[key]);

                if ( Person.Subjects[key].QuestProgressID ) {
                    this.scene.Game.QuestManager.UpdateQuest(Person.Subjects[key].QuestProgressID, Person.Subjects[key].QuestProgressStep);
                }

                if ( Person.Subjects[key].CompleteQuest ) {
                    let QuestCompleted = this.scene.Game.QuestManager.CompleteQuest(Person.Subjects[key].CompleteQuest);
                    if ( QuestCompleted == false ) {
                        console.log("Quest not ready for hand in");
                        return;
                    }
                }

                Subjects.forEach((subject: Phaser.GameObjects.Text) => subject.destroy());
                this.Hide();
                this.ShowSubject(person, key);

            });

            Y += SubjectText.height + 10;
            TotalHeight += SubjectText.height;

            Subjects.push(SubjectText);
            this.scene.cameras.main.ignore(SubjectText);
        }

        // Add goodbye button to end conversation
        let GoodbyeText = this.scene.add.text(this.Text.getBottomLeft().x, Y, "> Goodbye", {
            fontFamily: "Augusta",
            fontSize: 24,
            wordWrap: {
                useAdvancedWrap: true, 
                width: this.Background.width - 6
            }
        }).setInteractive()
        .on("pointerover", () => GoodbyeText.setColor("#ff0000"))
        .on("pointerout", () => GoodbyeText.setColor("#ffffff"))
        .on('pointerdown', () => {
            this.Hide();
            this.DialogueLayer.remove(Subjects);
            Subjects.forEach((subject: Phaser.GameObjects.Text) => subject.destroy());
            this.scene.CurrentJournalPage = null;
        });

        Subjects.push(GoodbyeText);

        this.scene.cameras.main.ignore(GoodbyeText);
        TotalHeight += GoodbyeText.height + 20;

        // Allow the dialouge camera to scroll over the entire total text area
        this.DialogueCamera.setBounds(this.Background.getTopLeft().x, this.Background.getTopLeft().y, 400, TotalHeight + 25).setVisible(true);
        this.DialogueLayer.setVisible(true);
    }

    Hide () {
        this.Text.setText("");
        this.DialogueCamera.setVisible(false);
        this.DialogueLayer.setVisible(false);
    }

}