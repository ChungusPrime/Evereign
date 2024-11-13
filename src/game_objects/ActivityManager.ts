import Game from "../scenes/Game";

export default class ActivityManager {

    public scene: Game;

    public CurrentActivity: Activity = {
        Type: "",
        Delta: 0
    }

    public ActivityProgressBarBG: Phaser.GameObjects.Rectangle;
    public ActivityProgressBar: Phaser.GameObjects.Image;
    public ActivityProgressText: Phaser.GameObjects.Text;

    constructor ( scene: Game ) {
        this.scene = scene;
        this.ActivityProgressBarBG = scene.UI.add.rectangle(scene.UI.cameras.main.width / 2 - 200, scene.UI.cameras.main.height * 0.9, 200, 20, 0x000000, 0.9).setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressBar = scene.UI.add.image(scene.UI.cameras.main.width / 2 - 200, scene.UI.cameras.main.height * 0.9, "blue-bar").setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressText = scene.UI.add.text(this.ActivityProgressBar.getTopCenter().x, this.ActivityProgressBar.getTopCenter().y - this.ActivityProgressBar.height, "Current Activity").setOrigin(0.5).setVisible(false);
    }

    StartActivity( object: Phaser.Physics.Arcade.Sprite ) {

        console.log(object);
        return;

        const distance = Phaser.Math.Distance.BetweenPoints(this.scene.PlayerCharacter, object);
    
        if ( distance > 75 )
            return this.scene.UI.EventLog.NewEvent("That is too far away");
            
        this.CurrentActivity.Delta = 0;

        if ( object.getData("type") == "Oak Tree" ) {
            this.CurrentActivity.Type = "Cutting wood";
            this.scene.sound.play("woodcutting", { loop: true });
        }

        this.scene.UI.EventLog.NewEvent(`You start ${this.CurrentActivity.Type}`);
        this.scene.events.emit('Activity-Started', this.CurrentActivity);
    }

    UpdateCurrentActivity( delta: number ) {

        if ( this.CurrentActivity.Type == "" ) return;

        this.CurrentActivity.Delta += delta;

        if ( this.CurrentActivity.Delta < 5000 ) return;

        this.CurrentActivity.Delta = 0;
        this.scene.events.emit('Activity-Update', this.CurrentActivity);

        if ( this.CurrentActivity.Type == "Cutting wood" ) {
            this.scene.InventoryManager.AddResource(1, 1);
            //this.scene.UI.EventLog.NewEvent(`You got 1x ${this.scene.InventoryManager.[1].name} and 5 Forestry experience`);
        }
            
        if ( this.CurrentActivity.Type == "Mining stone" ) {
            this.scene.InventoryManager.AddResource(2, 1);
            //this.scene.UI.EventLog.NewEvent(`You got 1x ${this.scene.InventoryManager.ResourceData[2].name} and 5 Mining experience`);
        }
            
        if ( this.CurrentActivity.Type == "Mining iron" ) {
            this.scene.InventoryManager.AddResource(3, 1);
            //this.scene.UI.EventLog.NewEvent(`You got 1x ${this.scene.InventoryManager.ResourceData[3].name} and 5 Mining experience`);
        }
        
    }

    CancelActivity () {
        this.scene.UI.EventLog.NewEvent(`You stop ${this.CurrentActivity.Type}`);
        this.CurrentActivity = { Type: "", Delta: 0 };
        this.scene.sound.stopByKey("woodcutting");
        this.scene.sound.stopByKey("mining");
        this.scene.events.emit('Activity-Ended', this.CurrentActivity);
    }

}