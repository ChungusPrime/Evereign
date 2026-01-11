import TownCentre from "./Buildings/TownCentre";
import Warehouse from "./Buildings/Warehouse";
import Inn from "./Buildings/Inn";
import Dwelling from "./Buildings/Dwelling";

const BuildingData: { [key: string]: BuildingData } = {
    ["Town Centre"]: TownCentre,
    ["Warehouse"]: Warehouse,
    ["Inn"]: Inn,
    ["Dwelling"]: Dwelling
};

export default BuildingData;