import Building from "../objects/game/Building";
import Chest from "../objects/game/Chest";
import IronDeposit from "../objects/game/IronDeposit";
import StoneDeposit from "../objects/game/StoneDeposit";
import GoblinFirepit from "../objects/game/GoblinFirepit";
import Torch from "../objects/game/Torch";
import TorchPole from "../objects/game/TorchPole";
import Bloomberry from "../objects/game/Bloomberry";
import Marigold from "../objects/game/Marigold";
import MunklesBrightcap from "../objects/game/MunklesBrightcap";
import WillowTree from "../objects/game/WillowTree";
import Switch from "../objects/game/Switch";
import FishingZone from "../objects/game/FishingZone";
import RespawnZone from "../objects/game/Respawn";
import Transition from "../objects/game/Transition";
import TriggerZone from "../objects/game/TriggerZone";
import DeadWillowTree from "../objects/game/DeadWillowTree";
import Boat from "../objects/game/Boat";
import NPC from "../objects/game/NPC";

const GameObjectsMap: { [key: string]: any } = {
    "Dead Willow Tree": DeadWillowTree,
    "Willow Tree": WillowTree,
    "Marigold": Marigold,
    "Bloomberry": Bloomberry,
    "Munkle's Brightcap": MunklesBrightcap,
    "Stone Deposit": StoneDeposit,
    "Iron Deposit": IronDeposit,
    "Torch": Torch,
    "Goblin Firepit": GoblinFirepit,
    "TorchPole": TorchPole,
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
    "Trigger": TriggerZone,
    "Fishing Spot": FishingZone,
    "Transition": Transition,
    "Orc Slinger": NPC,
    //"Warboss Gorgutz": NPC,
    "Chest": Chest,
    "Graveyard": RespawnZone,
    "Switch": Switch,
    "Boat_1": Boat,
    //"Obstacle": Obstacle,
};

export default GameObjectsMap;