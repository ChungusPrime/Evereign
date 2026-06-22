import TownCentre from "./Buildings/TownCentre";
import Warehouse from "./Buildings/Warehouse";
import Inn from "./Buildings/Inn";
import Dwelling from "./Buildings/Dwelling";
import BallistaTower from "./Buildings/BallistaTower";
import Chapel from "./Buildings/Chapel";
import Farm from "./Buildings/Farm";
import Field from "./Buildings/Field";
import LoggingCamp from "./Buildings/LoggingCamp";
import Market from "./Buildings/Market";
import Mine from "./Buildings/Mine";
import GoblinOutpost from "./Buildings/GoblinOutpost";
import GoblinTower from "./Buildings/GoblinTower";
import Port from "./Buildings/Port";

const BuildingData: { [key: string]: BuildingData } = {
    ["Ballista Tower"]: BallistaTower,
    ["Chapel"]: Chapel,
    ["Dwelling"]: Dwelling,
    ["Farm"]: Farm,
    ["Field"]: Field,
    ["Inn"]: Inn,
    ["Logging Camp"]: LoggingCamp,
    ["Market"]: Market,
    ["Mine"]: Mine,
    ["Orc Outpost"]: GoblinOutpost,
    ["Orc Tower"]: GoblinTower,
    ["Port"]: Port,
    ["Town Centre"]: TownCentre,
    ["Warehouse"]: Warehouse,
};

export default BuildingData;