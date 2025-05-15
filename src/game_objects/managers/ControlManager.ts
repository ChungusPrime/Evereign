import Game from "../../scenes/Game";

export default class ControlManager {
    
    public scene: Game;
    
    constructor ( scene: Game ) {
        
        this.scene = scene;
        // Set up controls for each bound button
        const ControlMapping: {[key: string]: string | number } = JSON.parse(localStorage.getItem("EvereignData")).Controls;
        
        for (const [key, value] of Object.entries(ControlMapping)) {
            if ( typeof value === 'string' ) {
                if ( value.includes("mouse") ) {
                    this.scene.input.on('pointerdown', (event: any) => {
                        if ( value == `mouse-${event.button}`) {
                            if ( key == "Controls_Use_Ability_1" ) this.scene.PlayerCharacter.UseAbility("Ability_1");
                            if ( key == "Controls_Use_Ability_2" ) this.scene.PlayerCharacter.UseAbility("Ability_2");
                            if ( key == "Controls_Use_Ability_3" ) this.scene.PlayerCharacter.UseAbility("Ability_3");
                            if ( key == "Controls_Use_Ability_4" ) this.scene.PlayerCharacter.UseAbility("Ability_4");
                            if ( key == "Controls_Use_Item_1" ) this.scene.PlayerCharacter.UseItem("Item_1");
                            if ( key == "Controls_Use_Item_2" ) this.scene.PlayerCharacter.UseItem("Item_2");
                            if ( key == "Controls_Use_Item_3" ) this.scene.PlayerCharacter.UseItem("Item_3");
                            if ( key == "Controls_Interact" ) this.scene.ActivityManager.StartActivity(this.scene.SelectedObject);
                        }
                    });
                } else {
                    let KeyObject = this.scene.input.keyboard.addKey(value, true, true);
                    this.scene.Controls.push(KeyObject);
                    KeyObject.on('down', (event: any) => {
                        if ( key == "Controls_Move_Left" ) this.scene.PlayerCharacter.LeftKeyDown = true;
                        if ( key == "Controls_Move_Right" ) this.scene.PlayerCharacter.RightKeyDown = true;
                        if ( key == "Controls_Move_Up" ) this.scene.PlayerCharacter.UpKeyDown = true;
                        if ( key == "Controls_Move_Down" ) this.scene.PlayerCharacter.DownKeyDown = true;
                        if ( key == "Controls_Interact" ) this.scene.ActivityManager.StartActivity(this.scene.SelectedObject);
                        if ( key == "Controls_Use_Ability_1" ) this.scene.PlayerCharacter.UseAbility("Ability_1");
                        if ( key == "Controls_Use_Ability_2" ) this.scene.PlayerCharacter.UseAbility("Ability_2");
                        if ( key == "Controls_Use_Ability_3" ) this.scene.PlayerCharacter.UseAbility("Ability_3");
                        if ( key == "Controls_Use_Ability_4" ) this.scene.PlayerCharacter.UseAbility("Ability_4");
                        if ( key == "Controls_Use_Item_1" ) this.scene.PlayerCharacter.UseItem("Item_1");
                        if ( key == "Controls_Use_Item_2" ) this.scene.PlayerCharacter.UseItem("Item_2");
                        if ( key == "Controls_Use_Item_3" ) this.scene.PlayerCharacter.UseItem("Item_3");
                    });
                    
                    KeyObject.on('up', (event: any) => {
                        if ( key == "Controls_Move_Left" ) this.scene.PlayerCharacter.LeftKeyDown = false;
                        if ( key == "Controls_Move_Right" ) this.scene.PlayerCharacter.RightKeyDown = false;
                        if ( key == "Controls_Move_Up" ) this.scene.PlayerCharacter.UpKeyDown = false;
                        if ( key == "Controls_Move_Down" ) this.scene.PlayerCharacter.DownKeyDown = false;
                    });
                }
            }
        }
    }
    
}