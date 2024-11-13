import Cursor from '../images/click_cursor.png';
import DefaultControlData from '../data/DefaultControlData';

class TextButton extends Phaser.GameObjects.BitmapText {
    public scene: Menu;
    public border: Phaser.GameObjects.NineSlice;
    constructor ( scene: Menu, x: number, y: number, text: string, callback: Function ) {
        super(scene, x, y, "Augusta", text, 32, 1);
        this.setOrigin(0.5, 0.5);
        this.setDropShadow(0, 3, 0x00000, 0.5)
        this.scene = scene;
        this.border = this.scene.add.nineslice(this.getCenter().x, this.getCenter().y, "Panel-Borders", "0", this.width + 25, this.height + 25, 28, 28, 28, 28).setOrigin(0.5, 0.5).setVisible(false);
        //this.border.setDisplaySize(this.displayWidth + 20, this.displayHeight + 20);
        this.setCharacterTint(0, -1, true, 0xffffff);
        this.setInteractive();
        this.on('pointerover', () => {
            this.setCharacterTint(0, -1, true, 0x2596be);
            this.border.setVisible(true);
        }).on('pointerout', () => {
            this.setCharacterTint(0, -1, true, 0xffffff);
            this.border.setVisible(false);
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });
        this.scene.add.existing(this);
    }

    show () {
        this.setVisible(true);
        this.border.setVisible(true);
    }

    hide () {
        this.setVisible(false);
        this.border.setVisible(false);
    }

 }

/*class TextButton extends Phaser.GameObjects.Text {
    public scene: Menu;
    constructor ( scene: Menu, x: number, y: number, text: string, callback: Function ) {
        super(scene, x, y, text, { fontSize: 32, align: "center", fontFamily: "Augusta" });
        this.setOrigin(0.5);
        this.scene = scene;
        this.setInteractive();
        this.on('pointerover', () => {
            this.setTint(0x2596be);
        }).on('pointerout', () => {
            this.clearTint();
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });
        this.scene.add.existing(this);
    }
}*/

export default class Menu extends Phaser.Scene {

    public TitleText!: Phaser.GameObjects.Text;
    public NewGameText!: TextButton;
    public QuitGameButton!: TextButton;
    public OptionsText!: TextButton;
    public CreditsButton!: TextButton;
    public BackButton!: TextButton;
    public SaveSlotOne!: TextButton;
    public SaveSlotTwo!: TextButton;
    public SaveSlotThree!: TextButton;

    public Controls: any = null;
    public ControlButtons: TextButton[] = [];
    public RebindKey: string | null = null;
    public RebindInProgress: boolean = false;
    public RebindTextObject: TextButton | null = null;
    public Action: string = "";

    constructor () {
        super({ key: "Menu" });
    }

    preload (): void {
        const ControlMapping: string | null = localStorage.getItem("EvereignControls");
        if ( !(ControlMapping) ) {
            const Encoded = JSON.stringify(DefaultControlData);
            localStorage.setItem("EvereignControls", Encoded);
            this.Controls = JSON.parse(Encoded);
        } else {
            this.Controls = JSON.parse(ControlMapping);
        }
    }

    create (): void {

        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        this.sound.play("track1", { loop: true } );

        let background = this.add.image(0, 0, "background").setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

        let logo = this.add.image(this.scale.width * 0.25, this.scale.height / 2, "logo").setOrigin(0.5).setDisplaySize(this.scale.width * 0.4, this.scale.height * 0.9);
        let text = this.add.text(logo.getBottomCenter().x, logo.getBottomCenter().y - 35, "EVEREIGN", { fontSize: 72, align: "center", fontFamily: "Augusta" }).setOrigin(0.5);

        this.TitleText = this.add.text(this.scale.width * 0.75, this.scale.height * 0.1, "New Game", { align: "center", fontSize: 32, fontFamily: "Augusta" }).setVisible(false).setOrigin(0.5);

        this.NewGameText = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.4, "Play", () => {
            this.Action = "Choose Save Slot";
            this.ShowSaveSlots();
        });

        this.NewGameText.setVisible(true);

        this.OptionsText = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.5, "Options", () => {
            this.ShowOptionsMenu();
        });

        this.OptionsText.setVisible(true);

        this.CreditsButton = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.6, "Credits", () => {
            console.log("show credits");
        });

        this.CreditsButton.setVisible(true);

        this.QuitGameButton = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.7, "Quit", () => {
            window.close();
        });

        this.QuitGameButton.setVisible(true);

        // Save Slots
        let SlotOneData = localStorage.getItem("EvereignSaveSlotOne");
        let LabelOne = "Save Slot #1\nNo Data";
        if ( SlotOneData != null ) {
            let Data = JSON.parse(SlotOneData);
            LabelOne = `Save Slot #1\nCreated: ${new Date(parseInt(Data.CreatedAtTimestamp)).toLocaleString("en-GB")}\nLast Save: ${new Date(parseInt(Data.LastSaveTimestamp)).toLocaleString("en-GB")}`;
        }
        this.SaveSlotOne = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.35, LabelOne, this.StartGame.bind(this, "EvereignSaveSlotOne")).setVisible(false);

        let SlotTwoData = localStorage.getItem("EvereignSaveSlotTwo");
        let LabelTwo = "Save Slot #2\nNo Data";
        if ( SlotTwoData != null ) {
            let Data = JSON.parse(SlotTwoData);
            LabelTwo = `Save Slot #2\nCreated: ${new Date(parseInt(Data.CreatedAtTimestamp)).toLocaleString("en-GB")}\nLast Save: ${new Date(parseInt(Data.LastSaveTimestamp)).toLocaleString("en-GB")}`;
        }
        this.SaveSlotTwo = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.5, LabelTwo, this.StartGame.bind(this, "EvereignSaveSlotTwo")).setVisible(false);

        let SlotThreeData = localStorage.getItem("EvereignSaveSlotThree");
        let LabelThree = "Save Slot #3\nNo Data";
        if ( SlotThreeData != null ) {
            let Data = JSON.parse(SlotThreeData);
            LabelThree = `Save Slot #3\nCreated: ${new Date(parseInt(Data.CreatedAtTimestamp)).toLocaleString("en-GB")}\nLast Save: ${new Date(parseInt(Data.LastSaveTimestamp)).toLocaleString("en-GB")}`;
        }
        this.SaveSlotThree = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.65, LabelThree, this.StartGame.bind(this, "EvereignSaveSlotThree")).setVisible(false);

        this.BackButton = new TextButton(this, this.scale.width * 0.75, this.scale.height * 0.9, "Back", this.ShowMenuButtons.bind(this)).setVisible(false);

        // Options Menu
        let Y = this.scale.height * 0.2;
        
        for (const [key, value] of Object.entries(this.Controls)) {
            let control = new TextButton(this, this.scale.width * 0.75, Y, `${key}: ${value}`, () => {}).setVisible(false);
            control.on('pointerdown', () => {
                this.StartRebind(key, control);
            });
            this.ControlButtons.push(control);
            Y = Y + control.height + 10;
        }

        this.cameras.main.fadeIn(2000);

    }

    StartRebind(key: string, control: TextButton) {
        this.RebindKey = key;
        this.RebindTextObject = control;
    }

    BindKey (key: string, value: string) {
        console.log(key, value);
        this.Controls[key] = value;
        localStorage.setItem("EvereignControls", JSON.stringify(this.Controls));
        this.RebindKey = null;
        this.RebindInProgress = false;
        this.RebindTextObject?.setText(`${key}: ${value}`);
        this.RebindTextObject = null;
    }

    ShowSaveSlots () {
        this.SaveSlotOne.setVisible(true);
        this.SaveSlotTwo.setVisible(true);
        this.SaveSlotThree.setVisible(true);
        this.NewGameText.setVisible(false);
        this.QuitGameButton.setVisible(false);
        this.OptionsText.setVisible(false);
        this.CreditsButton.setVisible(false);
        this.BackButton.setVisible(true);
        this.TitleText.setText(this.Action).setVisible(true);
        this.ControlButtons.forEach(element => {
            element.setVisible(false);
        });
    }

    ShowMenuButtons () {
        this.SaveSlotOne.setVisible(false);
        this.SaveSlotTwo.setVisible(false);
        this.SaveSlotThree.setVisible(false);
        this.NewGameText.setVisible(true);
        this.QuitGameButton.setVisible(true);
        this.OptionsText.setVisible(true);
        this.CreditsButton.setVisible(true);
        this.BackButton.setVisible(false);
        this.TitleText.setText("").setVisible(false);
        this.ControlButtons.forEach(element => {
            element.setVisible(false);
        });
    }

    ShowOptionsMenu () {
        this.SaveSlotOne.setVisible(false);
        this.SaveSlotTwo.setVisible(false);
        this.SaveSlotThree.setVisible(false);
        this.NewGameText.setVisible(false);
        this.QuitGameButton.setVisible(false);
        this.OptionsText.setVisible(false);
        this.CreditsButton.setVisible(false);
        this.BackButton.setVisible(true);
        this.TitleText.setText("Options").setVisible(true);
        this.ControlButtons.forEach(element => {
            element.setVisible(true);
        });
    }

    StartGame ( slot: string ) {
        this.sound.stopByKey('track1');
        this.scene.start("Game", { slot: slot });
    }

    update ( time: number, delta: number ): void {

        if ( this.RebindKey != null && !this.RebindInProgress ) {
            this.RebindInProgress = true;
            this.time.delayedCall(100, () => {

                this.RebindInProgress = true;
                this.RebindTextObject?.setText(`${this.RebindKey}: waiting for input...`);

                // Listen for keyboard inputs
                this.input.keyboard!.once('keydown', (event: any) => {
                    if ( !this.RebindInProgress || this.RebindKey == null ) return;
                    this.BindKey(this.RebindKey, event.key);
                });

                // Listen for mouse inputs
                this.input.once('pointerdown', (event: any) => {
                    if ( !this.RebindInProgress || this.RebindKey == null ) return;
                    this.BindKey(this.RebindKey, `mouse-${event.button}`);
                });

            }, [], this);
        }

    }

}
