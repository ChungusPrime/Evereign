import BallistaTower from "../game_objects/buildings/BallistaTower";
import Chapel from "../game_objects/buildings/Chapel";
import Farm from "../game_objects/buildings/Farm";
import Field from "../game_objects/buildings/Field";
import GoblinOutpost from "../game_objects/buildings/GoblinOutpost";
import Market from "../game_objects/buildings/Market";
import Mine from "../game_objects/buildings/Mine";
import GoblinSlinger from "../game_objects/characters/GoblinSlinger";
import WarbossGorgutz from "../game_objects/characters/WarbossGorgutz";
import Chest from "../game_objects/Chest";
import IronDeposit from "../game_objects/deposits/IronDeposit";
import StoneDeposit from "../game_objects/deposits/StoneDeposit";
import GoblinFirepit from "../game_objects/lights/GoblinFirepit";
import Torch from "../game_objects/lights/Torch";
import TorchPole from "../game_objects/lights/TorchPole";
import Bloomberry from "../game_objects/plants/Bloomberry";
import Marigold from "../game_objects/plants/Marigold";
import MunklesBrightcap from "../game_objects/plants/MunklesBrightcap";
import WillowTree from "../game_objects/plants/WillowTree";
import Switch from "../game_objects/Switch";
import FishingZone from "../game_objects/Zones/FishingZone";
import RespawnZone from "../game_objects/Zones/Respawn";
import Transition from "../game_objects/Zones/Transition";
import TriggerZone from "../game_objects/Zones/TriggerZone";
import Dwelling from "./../game_objects/buildings/Dwelling";
import Inn from "../game_objects/buildings/Inn";
import TownCentre from "../game_objects/buildings/TownCentre";
import Warehouse from "../game_objects/buildings/Warehouse";

const GameObjectsMap: { [key: string]: any } = {

    // Plants & Trees
    "Willow Tree": WillowTree,
    "Marigold": Marigold,
    "Bloomberry": Bloomberry,
    "Munkle's Brightcap": MunklesBrightcap,

    // Deposits
    "Stone Deposit": StoneDeposit,
    "Iron Deposit": IronDeposit,

    // Light Sources
    "Torch": Torch,
    "Goblin Firepit": GoblinFirepit,
    "TorchPole": TorchPole,

    // Buildings
    "Dwelling": Dwelling,
    "Inn": Inn,
    "Ballista Tower": BallistaTower,
    "Chapel": Chapel,
    "Town Centre": TownCentre,
    "Goblin Outpost": GoblinOutpost,
    "Market": Market,
    "Warehouse": Warehouse,
    "Field": Field,
    "Mine": Mine,
    "Farm": Farm,

    // Zones
    "Trigger": TriggerZone,
    "Fishing Spot": FishingZone,
    "Transition": Transition,

    // Characters
    "Orc Slinger": GoblinSlinger,
    "Warboss Gorgutz": WarbossGorgutz,

    // Interactive Objects
    "Chest": Chest,
    "Graveyard": RespawnZone,
    "Switch": Switch,

    //"Obstacle": Obstacle,
};

export default GameObjectsMap;