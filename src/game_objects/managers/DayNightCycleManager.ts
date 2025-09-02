import Game from "../../scenes/Game";
import UI from "../../scenes/UI";
import { GD } from "../../scenes/Game";
import Campaigns from "../../data/Campaigns";

export default class DayNightCycleManager {

    public scene: Game;
    public UI: UI;

    public RainEmitter: Phaser.GameObjects.Particles.ParticleEmitter = null;
    public IsRaining: boolean = true;
    public DayTimeText!: Phaser.GameObjects.Text;

    public DaytimeCycles: { hex: number, hour: number }[] = [
        { hex: 0x182026, hour: 0 },
        { hex: 0x0f1418, hour: 1 },
        { hex: 0x090c0f, hour: 2 },
        { hex: 0x040608, hour: 3 },
        { hex: 0x090c0f, hour: 4 },
        { hex: 0x0f1418, hour: 5 },
        { hex: 0x3e4c58, hour: 6 },
        { hex: 0xe2b45b, hour: 7 },
        { hex: 0xf6d79d, hour: 8 },
        { hex: 0xf5e5bc, hour: 9 },
        { hex: 0xfcefcc, hour: 10 },
        { hex: 0xfcf2d7, hour: 11 },
        { hex: 0xfff8e6, hour: 12 },
        { hex: 0xfffaed, hour: 13 },
        { hex: 0xfcf2d7, hour: 14 },
        { hex: 0xfcefcc, hour: 15 },
        { hex: 0xf6d79d, hour: 16 },
        { hex: 0xedc579, hour: 17 },
        { hex: 0xe2b45b, hour: 18 },
        { hex: 0xcb9939, hour: 19 },
        { hex: 0xb8882c, hour: 20 },
        { hex: 0xa0731e, hour: 21 },
        { hex: 0x576976, hour: 22 },
        { hex: 0x3e4c58, hour: 23 },
    ];

    public DaytimeHour: number;
    public DaytimeMinute: number;
    public DaytimeDelta: number;

    constructor ( scene: Game, UI: UI ) {

        this.scene = scene;
        this.UI = UI;

        let Campaign = Campaigns.find(c => c.Name == GD.Campaign);

        this.DaytimeHour = GD.DaytimeHour;
        this.DaytimeMinute = GD.DaytimeMinute;
        this.DaytimeDelta = GD.DaytimeDelta;

        if ( this.RainEmitter !== null )
            this.RainEmitter.destroy();

        this.RainEmitter = this.UI.add.particles(0, 0, "Rain", {
            x: { min: 0, max: this.UI.scale.width * 0.8 },
            y: this.scene.cameras.main.worldView.y,
            lifespan: { min: 0, max: 1200 },
            speedY: { min: 300, max: 500 },
            quantity: 10,
            scale: { start: 0.5, end: 0.5 },
            blendMode: 'ADD',
            gravityY: 250,
            deathCallback: (particle: any) => {
                let splash = this.UI.Game.add.sprite(
                    particle.x + this.UI.Game.cameras.main.scrollX,
                    particle.y + this.UI.Game.cameras.main.scrollY,
                    'Rain'
                )
                .setPipeline("Light2D")
                .setScale(0.5)
                .setVisible(true)
                .setBlendMode(Phaser.BlendModes.ADD)
                .play('rain-end');
                this.scene.UI.EventLog.EventsLogCamera.ignore(splash);
                splash.once('animationcomplete', () => {
                    splash.destroy();
                });
            }
        })
        .setPipeline("Light2D")
        .setActive(false)
        .setVisible(false)
        .setDepth(0);

        scene.physics.add.collider(this.RainEmitter, scene.CollisionLayer);

        this.SetPhase();

        if ( Campaign.WorldMapInformation[GD.CurrentMap].Type == "Exterior" ) {
            this.StartRaining();
        } else {
            this.StopRaining();
        }

    }

    StartRaining () {
        this.IsRaining = true;
        this.scene.sound.play('rain', { loop: true, volume: 0.5 });
        this.RainEmitter.setActive(true).setVisible(true);
        this.scene.cameras.main.postFX.addColorMatrix().grayscale(0.3);
    }

    StopRaining () {
        this.IsRaining = false;
        this.scene.sound.stopByKey('rain');
        this.RainEmitter.setActive(false).setVisible(false);
        this.scene.cameras.main.postFX.clear();
    }

    update ( delta: number ) {

        this.DaytimeDelta += delta;

        if ( this.DaytimeDelta >= 5000 ) {

            this.DaytimeDelta = 0;
            this.DaytimeMinute++;

            let CurrentPhase = this.DaytimeCycles[this.DaytimeHour];
            let NextPhase = this.DaytimeCycles[this.DaytimeHour + 1];

            // Calulate the color of the ambient light
            let r = Phaser.Math.Linear(CurrentPhase.hex >> 16 & 0xFF, NextPhase.hex >> 16 & 0xFF, this.DaytimeMinute / 60);
            let g = Phaser.Math.Linear(CurrentPhase.hex >> 8 & 0xFF, NextPhase.hex >> 8 & 0xFF, this.DaytimeMinute / 60);
            let b = Phaser.Math.Linear(CurrentPhase.hex & 0xFF, NextPhase.hex & 0xFF, this.DaytimeMinute / 60);
            let color = (r << 16) + (g << 8) + b;

            this.scene.lights.setAmbientColor(color);

            this.scene.UI.DayTimeText.setText(this.FormatTime());
        }

        if ( this.DaytimeMinute == 60 ) {
            this.DaytimeMinute = 0;
            this.DaytimeHour++;
            if ( this.DaytimeHour == 23 ) {
                this.DaytimeHour = 0;
            }
            this.scene.UI.DayTimeText.setText(this.FormatTime());
        }

    }

    FormatTime () {
        return `${this.DaytimeHour.toString().padStart(2, '0')}:${this.DaytimeMinute.toString().padStart(2, '0')}`;
    }

    SetPhase () {
        let Campaign = Campaigns.find(c => c.Name == GD.Campaign);
        let Type = Campaign.WorldMapInformation[GD.CurrentMap].Type;
        if ( Type == "Exterior" ) {
            this.scene.lights.setAmbientColor(this.DaytimeCycles[this.DaytimeHour].hex);
        } else if ( Type == "Interior" ) {
            this.scene.lights.setAmbientColor(0x000000);
        }
    }

}