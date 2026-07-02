import WillowTree from './Trees/WillowTree';
import Marigold from './Plants/Marigold';
import MunklesBrightcap from './Plants/MunklesBrightcap';
import Bloomberry from './Plants/Bloomberry';
import StoneNode from './Nodes/StoneNode';
import IronNode from './Nodes/IronNode';
import FishingSpot from './Zones/FishingZone';

/**
 * Maps Tiled object type strings to their ObjectData definitions.
 * The key must exactly match the "type" property on the Tiled object.
 */
const Objects: Record<string, ObjectData> = {
    "Willow Tree":        WillowTree,
    "Marigold":           Marigold,
    "Munkle's Brightcap": MunklesBrightcap,
    "Bloomberry":         Bloomberry,
    "Stone Node":         StoneNode,
    "Iron Node":          IronNode,
    "Fishing":            FishingSpot,
};

export default Objects;
