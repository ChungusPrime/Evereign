

import WillowTree from "./Objects/WillowTree";
import Marigold from './Objects/Marigold';
import MunklesBrightcap from './Objects/MunklesBrightcap';
import Bloomberry from './Objects/Bloomberry';
import StoneNode from './Objects/StoneNode';
import IronNode from './Objects/IronNode';
import FishingSpot from './Objects/FishingSpot';

const Objects: { [key: string]: ObjectData } = {};

Objects["Willow Tree"] = WillowTree;
Objects["Marigold"] = Marigold;
Objects["Munkle's Brightcap"] = MunklesBrightcap;
Objects["Bloomberry"] = Bloomberry;
Objects["Stone Node"] = StoneNode;
Objects["Iron Node"] = IronNode;
Objects["Fishing Spot"] = FishingSpot;

export default Objects;