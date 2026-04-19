import UI from "../scenes/UI";
import { GD } from "../scenes/Game";
import Campaigns from "../data/Campaigns";

export default class WorldMap {

    public scene: UI;
    public Camera: Phaser.Cameras.Scene2D.Camera;
    public Background: Phaser.GameObjects.Rectangle;
    public PlayerIndicator: Phaser.GameObjects.Rectangle;
    public MapImages: Phaser.GameObjects.Layer;

    public Maps: [
        'WillowvaleMap'
    ];

    public WillowvaleMap: Phaser.GameObjects.Image;
    public WillowvaleNorthMap: Phaser.GameObjects.Image;

    constructor( scene: UI ) {
        this.scene = scene;

        this.Camera = this.scene.cameras.add(this.scene.Game.cameras.main.width / 2 - 400, this.scene.Game.cameras.main.height / 2 - 300, 800, 600, false, "World-Map-Camera")
        .setOrigin(0.5, 0.5)
        .setBackgroundColor({ r: 0, g: 0, b: 0, a: 255 })
        .setVisible(false)
        .setZoom(0.5);

        this.Background = this.scene.add.rectangle(this.Camera.x - 10, this.Camera.y - 10, 820, 620, 0x000000, 1).setOrigin(0).setVisible(false);

        this.WillowvaleMap = this.scene.add.image(this.scene.Game.cameras.main.width / 2, this.scene.Game.cameras.main.height / 2, "WillowvaleMap").setOrigin(0).setInteractive()
        .on('pointerover', () => {
            //const data = this.scene.Game.DataManager.GetMapData("Willowvale");
            const hsv = Phaser.Display.Color.HSVColorWheel();
            this.WillowvaleMap.setTint(hsv[192].color);
        })
        .on('pointerout', () => {
            this.WillowvaleMap.clearTint();
        });

        this.WillowvaleNorthMap = this.scene.add.image(this.WillowvaleMap.getTopLeft().x, this.WillowvaleMap.getTopLeft().y - this.WillowvaleMap.height, "WillowvaleNorthMap").setOrigin(0).setInteractive()
        .on('pointerover', () => {
            //const data = this.scene.Game.DataManager.GetMapData("WillowvaleNorth");
            const hsv = Phaser.Display.Color.HSVColorWheel();
            this.WillowvaleNorthMap.setTint(hsv[192].color);
        })
        .on('pointerout', () => {
            this.WillowvaleNorthMap.clearTint();
        });

        this.Camera.ignore(this.scene.CharacterPanel.Group);

        //this.Camera.setBounds(this.WillowvaleMap.getBottomLeft().x, this.WillowvaleMap.getBottomLeft().y, this.WillowvaleMap.width, this.WillowvaleMap.height * 2);

        this.scene.input.on("pointermove", (p: Phaser.Input.Pointer ) => {
            if (p.isDown) {
                this.Camera.scrollX -= (p.x - p.prevPosition.x) / this.Camera.zoom;
                this.Camera.scrollY -= (p.y - p.prevPosition.y) / this.Camera.zoom;
            }
        }).on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            const current_zoom = this.Camera.zoom;
            if ( pointer.deltaY > 0 ) {
                if ( current_zoom < 0.009999999999999999 ) return;
                this.Camera.zoom -= 0.01;
            } else {
                //if ( current_zoom > 1.5 ) return;
                this.Camera.zoom += 0.01;
            }
            //console.log(this.Camera.zoom);
        });

        this.PlayerIndicator = this.scene.add.rectangle(0, 0, 16, 16, 0xf54242).setVisible(true);

        this.MapImages = this.scene.add.layer([
            this.WillowvaleMap,
            this.WillowvaleNorthMap,
            this.PlayerIndicator
        ]);

        this.UpdatePlayerIndicator(GD.X, GD.Y);
        this.CenterOnPlayerIndicator();

    }

    public UpdatePlayerIndicator ( x: number, y: number ) {
        if ( GD.CurrentMap === "Willowvale" ) {
            this.PlayerIndicator.setVisible(true).setPosition(this.WillowvaleMap.getTopLeft().x + x, this.WillowvaleMap.getTopLeft().y + y);
        } else {
            this.PlayerIndicator.setVisible(false);
        }
    }

    public CenterOnPlayerIndicator () {
        if ( this.PlayerIndicator.visible == true ) {
            this.Camera.centerOn(this.PlayerIndicator.x, this.PlayerIndicator.y);
        }
    }

    public Toggle () {

        const Campaign = Campaigns.find((c) => c.Name == GD.Campaign);
        let Type = Campaign.WorldData[GD.CurrentMap].Information.Type;

        if ( Type == "Interior" )
            return this.scene.EventLog.NewEvent("You cannot access the world map from here.");

        if ( this.Camera.visible ) {
            this.Background.setVisible(false);
            return this.Camera.setVisible(false);
        }

        this.Background.setVisible(true);
        this.Camera.setVisible(true);

    }

}