import Building from "../objects/game/Building";
import FishingZone from "../objects/game/FishingZone";
import RespawnZone from "../objects/game/Respawn";
import Transition from "../objects/game/Transition";
import TriggerZone from "../objects/game/TriggerZone";
import NPC from "../objects/game/NPC";
import GenericObject from "../objects/game/GenericObject";

const GameObjectsMap: { [key: string]: any } = {

    // Buildings
    "Dwelling": Building,
    "Inn": Building,
    "Ballista Tower": Building,
    "Chapel": Building,
    "Town Centre": Building,
    "Orc Outpost": Building,
    "Orc Tower": Building,
    "Market": Building,
    "Warehouse": Building,
    "Field": Building,
    "Mine": Building,
    "Farm": Building,
    "Port": Building,
    "Logging Camp": Building,

    // Lights
    "Torch": GenericObject,
    "Goblin Firepit": GenericObject,
    "TorchPole": GenericObject,

    // Trees
    "Dead Willow Tree": GenericObject,
    "Willow Tree": GenericObject,

    // Plants
    "Marigold": GenericObject,
    "Bloomberry": GenericObject,
    "Munkle's Brightcap": GenericObject,

    // Deposits
    "Stone Deposit": GenericObject,
    "Iron Deposit": GenericObject,

    // Zones
    "Trigger": TriggerZone,
    "Fishing Spot": FishingZone,
    "Transition": Transition,
    "Graveyard": RespawnZone,

    // Objects
    "Switch": GenericObject,
    "Boat_1": GenericObject,
    //"Obstacle": GenericObject,
    "Chest": GenericObject,

    // NPCs
    "Orc Slinger": NPC,
    //"Warboss Gorgutz": NPC,
};

export default GameObjectsMap;