import Game, { GD, MD } from "../scenes/Game";

type ActionHandler = {
    onDown?: () => void;
    onUp?: () => void;
};

type ActionConfig = {
    [actionName: string]: ActionHandler;
};

/**
 * InputManager - Handles all player input with a declarative action-based approach.
 * 
 * Usage:
 * 1. Define actions in the `actions` config with onDown/onUp handlers
 * 2. Actions are automatically bound to keys defined in user's Controls settings
 * 3. Supports keyboard keys, number keys, and mouse buttons ("mouse-0", "mouse-1", etc.)
 */
export default class InputManager {

    private scene: Game;
    private keys: Phaser.Input.Keyboard.Key[] = [];
    private actions: ActionConfig;

    // Map string digits to Phaser key codes
    private static readonly NUMBER_KEY_MAP: { [key: string]: number } = {
        "0": Phaser.Input.Keyboard.KeyCodes.ZERO,
        "1": Phaser.Input.Keyboard.KeyCodes.ONE,
        "2": Phaser.Input.Keyboard.KeyCodes.TWO,
        "3": Phaser.Input.Keyboard.KeyCodes.THREE,
        "4": Phaser.Input.Keyboard.KeyCodes.FOUR,
        "5": Phaser.Input.Keyboard.KeyCodes.FIVE,
        "6": Phaser.Input.Keyboard.KeyCodes.SIX,
        "7": Phaser.Input.Keyboard.KeyCodes.SEVEN,
        "8": Phaser.Input.Keyboard.KeyCodes.EIGHT,
        "9": Phaser.Input.Keyboard.KeyCodes.NINE,
    };

    constructor(scene: Game) {
        this.scene = scene;
        this.actions = this.buildActionConfig();
        this.bindControls();
        this.bindDebugKeys();
    }

    /**
     * Define all game actions and their handlers here.
     * For "held" actions (like movement), provide both onDown and onUp.
     * For "press once" actions, only provide onDown.
     */
    private buildActionConfig(): ActionConfig {
        const player = this.scene.PlayerCharacter;
        return {
            Move_Up:    { onDown: () => player.UpKeyDown = true,    onUp: () => player.UpKeyDown = false },
            Move_Down:  { onDown: () => player.DownKeyDown = true,  onUp: () => player.DownKeyDown = false },
            Move_Left:  { onDown: () => player.LeftKeyDown = true,  onUp: () => player.LeftKeyDown = false },
            Move_Right: { onDown: () => player.RightKeyDown = true, onUp: () => player.RightKeyDown = false },
            Interact:      { onDown: () => this.scene.ActionManager.StartActivity(this.scene.SelectedObject) },
            Toggle_Light:  { onDown: () => player.ToggleLight() },
            Weapon_Attack: { onDown: () => player.MainHandKeyDown = true, onUp: () => player.MainHandKeyDown = false },
            Use_Hotbar_1:  { onDown: () => this.scene.UseHotbarSlot("1") },
            Use_Hotbar_2:  { onDown: () => this.scene.UseHotbarSlot("2") },
            Use_Hotbar_3:  { onDown: () => this.scene.UseHotbarSlot("3") },
            Use_Hotbar_4:  { onDown: () => this.scene.UseHotbarSlot("4") },
            Use_Hotbar_5:  { onDown: () => this.scene.UseHotbarSlot("5") },
            Use_Hotbar_6:  { onDown: () => this.scene.UseHotbarSlot("6") },
            Use_Hotbar_7:  { onDown: () => this.scene.UseHotbarSlot("7") },
            Use_Hotbar_8:  { onDown: () => this.scene.UseHotbarSlot("8") },
            Use_Hotbar_9:  { onDown: () => this.scene.UseHotbarSlot("9") },
            Use_Hotbar_10: { onDown: () => this.scene.UseHotbarSlot("10") },
        };
    }

    /**
     * Bind user control settings to action handlers
     */
    private bindControls(): void {
        const controls: { [key: string]: string } = JSON.parse(localStorage.getItem("EvereignData")).Controls;

        for (const [actionName, binding] of Object.entries(controls)) {
            const action = this.actions[actionName];
            if (!action) continue;

            if (typeof binding === "string") {
                if (binding.startsWith("mouse-")) {
                    this.bindMouseAction(binding, action);
                } else {
                    this.bindKeyboardAction(binding, action);
                }
            }
        }
    }

    /**
     * Bind a mouse button to an action
     */
    private bindMouseAction(binding: string, action: ActionHandler): void {
        const buttonIndex = parseInt(binding.split("-")[1], 10);

        if (action.onDown) {
            this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                if (pointer.button === buttonIndex) {
                    action.onDown!();
                }
            });
        }

        if (action.onUp) {
            this.scene.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
                if (pointer.button === buttonIndex) {
                    action.onUp!();
                }
            });
        }
    }

    /**
     * Bind a keyboard key to an action
     */
    private bindKeyboardAction(binding: string, action: ActionHandler): void {
        const keyCode = InputManager.NUMBER_KEY_MAP[binding] ?? binding;
        const key = this.scene.input.keyboard.addKey(keyCode, true, true);
        this.keys.push(key);

        if (action.onDown) {
            key.on("down", action.onDown);
        }

        if (action.onUp) {
            key.on("up", action.onUp);
        }
    }

    /**
     * Debug keys (not user-configurable)
     */
    private bindDebugKeys(): void {
        const keyboard = this.scene.input.keyboard;
        keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).on("down", () => console.log("GD:", GD));
        keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P).on("down", () => console.log("Inventory:", this.scene.Inventory.Items));
        keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N).on("down", () => this.scene.UI.RestMenu.showMenu());
        keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M).on("down", () => console.log("MD: ", MD));
    }

    /**
     * Clean up all registered keys (call when scene shuts down)
     */
    destroy(): void {
        this.keys.forEach(key => key.destroy());
        this.keys = [];
    }
}
