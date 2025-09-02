import TownCentre from "./Buildings/TownCentre";
import WarehouseData from "./Buildings/Warehouse";
import InnData from "./Buildings/Inn";
import DwellingData from "./Buildings/Dwelling";

const BuildingData: { [key: string]: BuildingData } = {
    [TownCentre.ID]: TownCentre,
    [WarehouseData.ID]: WarehouseData,
    [InnData.ID]: InnData,
    [DwellingData.ID]: DwellingData

};

export default BuildingData;