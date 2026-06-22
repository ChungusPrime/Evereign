// Display a screen that allows the player to rest and recover health and stamina.
// The player can choose how many hours to rest for and the game will advance time accordingly.

import UI from "../../scenes/UI";
import TextButton from "./UI_TextButton";
import BBCodeText from 'phaser4-rex-plugins/plugins/bbcodetext.js';
export default class RestMenu extends Phaser.GameObjects.NineSlice {

    public scene: UI;
    public background: Phaser.GameObjects.Rectangle
    public titleText: Phaser.GameObjects.Text;
    public infoText: Phaser.GameObjects.Text;
    public hoursText: Phaser.GameObjects.Text;
    public increaseButton: TextButton;
    public decreaseButton: TextButton;
    public confirmButton: TextButton;
    public closeButton: TextButton;
    public hoursToRest: number = 1;
    public maxRestHours: number = 8;
    public group: Phaser.GameObjects.Group;

    constructor ( scene: UI ) {

        super(scene, scene.Game.cameras.main.centerX, scene.Game.cameras.main.centerY, "Kenney-UI", "panel_blue", 330, 440, 16, 16, 16, 16);

        this.scene = scene;

        this.setOrigin(0.5);
        this.setVisible(false);

        this.scene.add.existing(this);

        this.group = this.scene.add.group();

        let position = this.getTopCenter();

        this.titleText = this.scene.add.text(position.x, position.y + 25, "Rest Menu", { fontSize: 24 }).setOrigin(0.5);
        this.group.add(this.titleText);

        this.infoText = this.scene.add.text(position.x, position.y + 70, "Choose how many hours to rest:", { fontSize: 24 }).setOrigin(0.5);
        this.group.add(this.infoText);

        this.hoursText = this.scene.add.text(position.x, position.y + 120, `${this.hoursToRest} hour(s)`, { fontSize: 24 }).setOrigin(0.5);
        this.group.add(this.hoursText);

        this.decreaseButton = new TextButton(this.scene, position.x - 100, position.y + 40, "-", () => this.changeHours(-1), 48, "#ff0000").setOrigin(0.5);
        this.group.add(this.decreaseButton);

        this.increaseButton = new TextButton(this.scene, position.x + 100, position.y + 40, "+", () => this.changeHours(1), 48, "#00ff00").setOrigin(0.5);
        this.group.add(this.increaseButton);

        this.confirmButton = new TextButton(this.scene, position.x, position.y + 100, "Confirm", () => this.confirmRest(), 32, "#00ff00").setOrigin(0.5);
        this.group.add(this.confirmButton);

        this.closeButton = new TextButton(this.scene, position.x, position.y + 150, "Close", () => this.closeMenu(), 32, "#ff0000").setOrigin(0.5);
        this.group.add(this.closeButton);

        this.group.setVisible(false);

        this.scene.add.existing(this.group);
        
    }

    showMenu () {
        this.hoursToRest = 1;
        this.hoursText.setText(`${this.hoursToRest} hour(s)`);
        this.setVisible(true);
        this.group.setVisible(true);
    }

    changeHours ( amount: number ) {
        this.hoursToRest += amount;
        if ( this.hoursToRest < 1 ) this.hoursToRest = 1;
        if ( this.hoursToRest > this.maxRestHours ) this.hoursToRest = this.maxRestHours;
        this.hoursText.setText(`${this.hoursToRest} hour(s)`);
        this.scene.sound.play('click');
    }

    confirmRest () {

        const framesToAdvance = 60 * 5 * this.hoursToRest * 60;
        let time = 0;
        const delta = 16.66;

        console.log(`resting for ${this.hoursToRest} hours (${framesToAdvance} frames)`);

        for (let i = 0; i < framesToAdvance; i++) {
            time += delta;
            this.scene.update(time, delta);
            this.scene.Game.update(time, delta);
        }

        this.closeMenu();
    }

    closeMenu () {
        this.setVisible(false);
        this.group.setVisible(false);
        this.scene.sound.play('click');
    }

}
