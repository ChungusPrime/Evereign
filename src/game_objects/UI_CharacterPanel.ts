import UI from "../scenes/UI";
import { GD } from "../scenes/Game";

export default class CharacterPanel {

    public scene: UI;
    public Group: Phaser.GameObjects.Group;
    public Background: Phaser.GameObjects.Rectangle;
    public LifeBG: Phaser.GameObjects.Rectangle;
    public LifeBar: Phaser.GameObjects.Image;
    public LifeText: Phaser.GameObjects.Text;
    public ManaBG: Phaser.GameObjects.Rectangle;
    public ManaBar: Phaser.GameObjects.Image;
    public ManaText: Phaser.GameObjects.Text;

    constructor ( scene: UI ) {
        this.scene = scene;
        this.Group = this.scene.add.group();
        this.SetupPanel();
    }

    SetupPanel () {

        this.Group.clear(true, true);

        this.Background = this.scene.add.rectangle(5, this.scene.cameras.main.height - 5, 340, 140, 0x000000, 0).setOrigin(0, 1);

        this.LifeBG = this.scene.add.rectangle(this.Background.getTopLeft().x, this.Background.getTopLeft().y + 3, 340, 30, 0x000000, 1).setOrigin(0, 0);
        this.LifeBar = this.scene.add.image(this.LifeBG.getTopLeft().x, this.LifeBG.getTopLeft().y, "red-bar").setDisplaySize(this.LifeBG.width, 30).setOrigin(0, 0);
        this.LifeText = this.scene.add.text(this.LifeBar.getLeftCenter().x + 4, this.LifeBar.getLeftCenter().y, "LIFE", { fontFamily: "Augusta"} ).setOrigin(0, 0.5);

        this.ManaBG = this.scene.add.rectangle(this.LifeBG.getBottomLeft().x, this.LifeBG.getBottomLeft().y + 5, 340, 30, 0x000000, 1).setOrigin(0, 0);
        this.ManaBar = this.scene.add.image(this.ManaBG.getTopLeft().x, this.ManaBG.getTopLeft().y, "blue-bar").setDisplaySize(this.ManaBG.width, 30).setOrigin(0, 0);
        this.ManaText = this.scene.add.text(this.ManaBar.getLeftCenter().x + 4, this.ManaBar.getLeftCenter().y, "MANA", { fontFamily: "Augusta"}).setOrigin(0, 0.5);

        this.UpdateVitalsBars();

        // Bottom Left Character Panel;
        /*let ClassAbilities = this.scene.Game.DataManager.GetClass(GD.Class).abilities;
        if ( ClassAbilities !== undefined ) {
            let X = 5;
            for (const [key, value] of Object.entries(ClassAbilities)) {

                let rect = this.scene.add.nineslice(X, this.Background.getBottomLeft().y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6).setOrigin(0, 1);

                const sprite = value.sprite.split("-");
                let icon = this.scene.add.sprite(rect.getCenter().x, rect.getCenter().y, sprite[0], sprite[1]).setOrigin(0.5).setDisplaySize(64, 64);
                let input = null;
                if ( key == "Passive" ) {
                    input = this.scene.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 94).setOrigin(0).setDisplaySize(24, 24);
                } else if ( key == "Ability_1" ) {
                    input = this.scene.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 77).setOrigin(0).setDisplaySize(24, 24);
                } else if ( key == "Ability_2" ) {
                    input = this.scene.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 85).setOrigin(0).setDisplaySize(24, 24);
                } else if ( key == "Ability_3" ) {
                    input = this.scene.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 52).setOrigin(0).setDisplaySize(24, 24);
                } else if ( key == "Ability_4" ) {
                    input = this.scene.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 87).setOrigin(0).setDisplaySize(24, 24);
                }
                this.Group.add(rect);
                this.Group.add(icon);
                this.Group.add(input);
                X += 69;
            }
        }*/

        this.Group = this.Group.addMultiple([
            this.Background,
            this.LifeBG,
            this.LifeBar,
            this.LifeText,
            this.ManaBG,
            this.ManaBar,
            this.ManaText
        ]);

    }

    UpdateVitalsBars () {

        let HealthWidth = (this.scene.Game.PlayerCharacter.Health / this.scene.Game.PlayerCharacter.MaxHealth * this.LifeBG.width);
        this.LifeBar.setDisplaySize(HealthWidth, 30);

        let ManaWidth = (this.scene.Game.PlayerCharacter.Mana / this.scene.Game.PlayerCharacter.MaxMana * this.LifeBG.width);
        this.ManaBar.setDisplaySize(ManaWidth, 30);

    }

}