

import WillowTree from "./Objects/Trees/WillowTree";
import Marigold from './Objects/Plants/Marigold';
import MunklesBrightcap from './Objects/Plants/MunklesBrightcap';
import Bloomberry from './Objects/Plants/Bloomberry';
import StoneNode from './Objects/Nodes/StoneNode';
import IronNode from './Objects/Nodes/IronNode';
import Torch from "./Objects/Lights/Torch";
import TorchPole from "./Objects/Lights/TorchPole";
import OrcFirepit from "./Objects/Lights/OrcFirepit";
import DeadWillowTree from "./Objects/Trees/DeadWillowTree";
import Chest from "./Objects/General/Chest";
import Boat from "./Objects/General/Boat";
import Switch from "./Objects/General/Switch";  
import RespawnZone from "./Objects/Zones/RespawnZone";
import FishingZone from "./Objects/Zones/FishingZone";
import TransitionZone from "./Objects/Zones/TransitionZone";
import TriggerZone from "./Objects/Zones/TriggerZone";

const Objects: { [key: string]: any } = {};

Objects["Dead Willow Tree"] = DeadWillowTree;
Objects["Willow Tree"] = WillowTree;

Objects["Marigold"] = Marigold;
Objects["Munkle's Brightcap"] = MunklesBrightcap;
Objects["Bloomberry"] = Bloomberry;

Objects["Stone Node"] = StoneNode;
Objects["Iron Node"] = IronNode;

Objects["Torch"] = Torch;
Objects["Orc Firepit"] = OrcFirepit;
Objects["Torch Pole"] = TorchPole;

Objects["Switch"] = Switch;
Objects["Boat_1"] = Boat;
Objects["Chest"] = Chest;

Objects["Trigger Zone"] = TriggerZone;
Objects["Fishing Zone"] = FishingZone;
Objects["Transition Zone"] = TransitionZone;
Objects["Respawn Zone"] = RespawnZone;

export default Objects;