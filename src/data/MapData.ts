// Single maps that are not part of campaigns, such as the arena, are loaded here. 

const MapData: { [key: string]: WorldData } = {}

import ArenaData from "./Maps/Arena";

MapData["Arena"] = ArenaData;

export default MapData;