import Game from "../scenes/Game";
import UI from "../scenes/UI";

export default class DayNightCycleManager {

    public scene: Game;
    public UI: UI;

    public RainEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    public IsRaining: boolean = true;
    public DayTimeText!: Phaser.GameObjects.Text;

    public CurrentMap: _Map;

    /*public DaytimeCycles: { hex: number, hour: number }[] = [
        { hex: 0x182026, hour: 0 },
        { hex: 0x182026, hour: 1 },
        { hex: 0x182026, hour: 2 },
        { hex: 0x182026, hour: 3 },
        { hex: 0x182026, hour: 4 },
        { hex: 0x402b1a, hour: 5 },
        { hex: 0x402b1a, hour: 6 },
        { hex: 0x402b1a, hour: 7 },
        { hex: 0x402b1a, hour: 8 },
        { hex: 0xcfb265, hour: 9 },
        { hex: 0xcfb265, hour: 10 },
        { hex: 0xfaf1d9, hour: 11 },
        { hex: 0xfaf1d9, hour: 12 },
        { hex: 0xfaf1d9, hour: 13 },
        { hex: 0xfaf1d9, hour: 14 },
        { hex: 0xfaf1d9, hour: 15 },
        { hex: 0xfaf1d9, hour: 16 },
        { hex: 0xb5a16b, hour: 17 },
        { hex: 0xb5a16b, hour: 18 },
        { hex: 0x8f7633, hour: 19 },
        { hex: 0x8f7633, hour: 20 },
        { hex: 0x8f7633, hour: 21 },
        { hex: 0x182026, hour: 22 },
        { hex: 0x182026, hour: 23 },
    ];*/

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

        this.DaytimeHour = this.scene.DataManager.GameData.DaytimeHour;
        this.DaytimeMinute = this.scene.DataManager.GameData.DaytimeMinute;
        this.DaytimeDelta = this.scene.DataManager.GameData.DaytimeDelta;

        this.RainEmitter = this.UI.add.particles(0, 0, "Rain", {
            x: { min: 0, max: this.UI.scale.width * 0.8 },
            y: this.scene.cameras.main.worldView.y,
            lifespan: 2000,
            speedY: { min: 300, max: 500 },
            scale: { start: 0.2, end: 0.1 },
            quantity: 25,
            blendMode: 'ADD',
            gravityY: 900,
            angle: { min: 85, max: 95 },
        })
        .setPipeline("Light2D")
        .setActive(false)
        .setVisible(false);
        this.SetPhase();
        this.StartRaining();
    }

    StartRaining () {
        this.IsRaining = true;
        this.scene.sound.play('rain', { loop: true, volume: 0.5 });
        this.RainEmitter.setActive(true).setVisible(true);
    }

    StopRaining () {
        this.IsRaining = false;
        this.scene.sound.stopByKey('rain');
        this.RainEmitter.setActive(false).setVisible(false);
    }

    update ( delta: number ) {

        this.DaytimeDelta += delta;

        if ( this.DaytimeDelta >= 5000 ) {
            this.DaytimeDelta = 0;
            this.DaytimeMinute++;
            this.scene.UI.DayTimeText.setText(`${this.scene.DaytimeCycleManager.DaytimeHour.toString().padStart(2, '0')}:${this.scene.DaytimeCycleManager.DaytimeMinute.toString().padStart(2, '0')}`);
        }

        if ( this.DaytimeMinute == 60 ) {
            this.DaytimeMinute = 0;
            this.DaytimeHour++;
            if ( this.DaytimeHour == 23 ) {
                this.DaytimeHour = 0;
            }
            this.scene.UI.DayTimeText.setText(`${this.scene.DaytimeCycleManager.DaytimeHour.toString().padStart(2, '0')}:${this.scene.DaytimeCycleManager.DaytimeMinute.toString().padStart(2, '0')}`);
            this.SetPhase();
        }

    }

    SetPhase () {
        let Map = this.scene.DataManager.GetMapData(this.scene.DataManager.GameData.CurrentMap)
        if ( Map == false ) return;
        if ( Map.Type == "Exterior" ) {
            this.scene.lights.setAmbientColor(this.DaytimeCycles[this.DaytimeHour].hex);
        } else {
            this.scene.lights.setAmbientColor(0x000000);
        }
    }

}

// Tween the ambient light color
/*this.tweens.addCounter({
    from: this.DaytimeCycles[this.DaytimePhase - 1].rgbColor,
    to: this.DaytimeCycles[this.DaytimePhase].rgbColor,
    duration: 1500,
    onUpdate: (tween) => {
        //const color = Phaser.Display.Color.IntegerToRGB(tween.getValue());
        //const interpolatedColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
        this.lights.setAmbientColor(tween.getValue());
    }
});*/