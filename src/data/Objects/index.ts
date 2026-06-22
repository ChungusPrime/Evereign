import WillowTree from './WillowTree';
import Marigold from './Marigold';
import MunklesBrightcap from './MunklesBrightcap';
import Bloomberry from './Bloomberry';
import StoneNode from './StoneNode';
import IronNode from './IronNode';
import FishingSpot from './FishingSpot';

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
