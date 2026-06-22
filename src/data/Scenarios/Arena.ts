import Classes from "../../data/Classes";
import Races from "../../data/Races";

const Arena: Scenario = {
    Name: "Arena",
    Description: "A test scenario for the arena map.",
    StartingPosition: { X: 1600, Y: 1600 },
    MapKey: "Arena",
    DaytimeDelta: 0,
    DaytimeHour: 12,
    DaytimeMinute: 0,

    CharacterName: "Bithmas",
    CharacterRace: Races.Human,
    CharacterClass: Classes.Agent,

    WorldData: {
        "Arena_Trigger": {
            Type: "Trigger",
            StartDialogue: "Arena Challenge",
            DialogueSubject: "Arena Challenge",
            InitialData: {
                Active: true
            },
        },
        "Test_Orc_Outpost_1": {
            Type: "Orc Outpost",
            Name: "Orc Outpost",
            Level: 1,
            OnDestroyDisableObstacle: [],
            InitialData: {
                Units: [
                    { Name: "Orc Slinger", Total: 1, Alive: 0, Dead: 0, Level: 1, Modifiers: ["Fortified"] },
                    { Name: "Orc Slinger", Total: 1, Alive: 0, Dead: 0, Level: 2, Modifiers: ["Aggressive"] },
                    { Name: "Orc Slinger", Total: 1, Alive: 0, Dead: 0, Level: 3, Modifiers: ["Infested"] },
                ]
            }
        },
        "Test_Chest_1": {
            Type: "Chest",
            Name: "Wooden Chest",
            InitialData: {
                Unlocked: true,
                Loot: [
                    { ItemID: "gold", Amount: 50 },
                    { ItemID: "shard_valius", Amount: 1 },
                    { ItemID: "town_centre_blueprint", Amount: 1 },
                    { ItemID: "marigold_brew", Amount: 2 },
                    { ItemID: "dwelling_blueprint", Amount: 1 },
                    { ItemID: "arming_sword_1", Amount: 1 },
                    { ItemID: "worn_hammer", Amount: 1 },
                ]
            }
        },
        "orcish1": {
            Type: "Orc Slinger",
            Level: 1,
            Modifiers: ["Fortified"],
            InitialData: {
                Alive: true,
                Health: 10
            }
        },
        "orcish2": {
            Type: "Orc Slinger",
            Level: 2,
            Modifiers: ["Brutal"],
            InitialData: {
                Alive: true,
                Health: 10
            }
        },
    },
};

export default Arena;