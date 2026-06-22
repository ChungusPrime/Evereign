// Single maps that are not part of campaigns, such as the arena, are loaded here. 

const ScenarioData: { [key: string]: Scenario } = {}

import Arena from "./Scenarios/Arena";
import EmberfallIsland from "./Scenarios/TheDefenceOfEmberfallIsland";
import Tutorial from "./Scenarios/Tutorial";

ScenarioData["Arena"] = Arena;
ScenarioData["The Defence of Emberfall Island"] = EmberfallIsland;
ScenarioData["Tutorial"] = Tutorial;

export default ScenarioData;