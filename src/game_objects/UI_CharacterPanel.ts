import UI from "../scenes/UI";
import { GD } from "../scenes/Game";

export default class CharacterPanel {

    public scene: UI;
    public Group: Phaser.GameObjects.Group;
    public Background: Phaser.GameObjects.NineSlice;
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

        this.Background = this.scene.add.nineslice(0, this.scene.cameras.main.height, "Kenney-UI", "panelInset_blue", 1024, 70, 12, 12, 12, 12).setOrigin(0, 1).setDepth(0);

        this.LifeBG = this.scene.add.rectangle(this.Background.getTopLeft().x, this.Background.getTopLeft().y + 3, 340, 30, 0x000000, 1).setOrigin(0, 0);
        this.LifeBar = this.scene.add.image(this.LifeBG.getTopLeft().x, this.LifeBG.getTopLeft().y, "red-bar").setDisplaySize(this.LifeBG.width, 30).setOrigin(0, 0);
        this.LifeText = this.scene.add.text(this.LifeBar.getLeftCenter().x + 4, this.LifeBar.getLeftCenter().y, "LIFE", { fontFamily: "Augusta"} ).setOrigin(0, 0.5);

        this.ManaBG = this.scene.add.rectangle(this.LifeBG.getBottomLeft().x, this.LifeBG.getBottomLeft().y + 5, 340, 30, 0x000000, 1).setOrigin(0, 0);
        this.ManaBar = this.scene.add.image(this.ManaBG.getTopLeft().x, this.ManaBG.getTopLeft().y, "blue-bar").setDisplaySize(this.ManaBG.width, 30).setOrigin(0, 0);
        this.ManaText = this.scene.add.text(this.ManaBar.getLeftCenter().x + 4, this.ManaBar.getLeftCenter().y, "MANA", { fontFamily: "Augusta"}).setOrigin(0, 0.5);

        this.UpdateVitalsBars();

        this.Group = this.Group.addMultiple([
            this.Background,
            this.LifeBG,
            this.LifeBar,
            this.LifeText,
            this.ManaBG,
            this.ManaBar,
            this.ManaText
        ]);

        console.log(GD.Hotbar);

        Object.entries(GD.Hotbar).forEach( (slot, index) => {
            let X = this.LifeBG.getTopRight().x + 10 + (index * 64);
            let Y = this.LifeBG.getTopRight().y;
            let rect = this.scene.add.nineslice(X, Y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6).setOrigin(0, 0);
        });

    }

    UpdateVitalsBars () {
        let HealthWidth = (GD.CurrentHealth / GD.MaxHealth * this.LifeBG.width);
        this.LifeBar.setDisplaySize(HealthWidth, 30);
        let ManaWidth = (GD.CurrentMana / GD.MaxHealth * this.ManaBG.width);
        this.ManaBar.setDisplaySize(ManaWidth, 30);
    }

}