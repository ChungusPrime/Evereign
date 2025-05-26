const ItemData: ItemData[] = [];

// Weapons
import Shotguns from "./Items/Shotguns";
ItemData.push(...Shotguns);

import Staffs from "./Items/Staffs";
ItemData.push(...Staffs);

import Consumables from "./Items/Consumables";
import Currency from "./Items/Currency";
import Food from "./Items/Food";
import Keys from "./Items/Keys";
import Resources from "./Items/Resources";
import Tools from "./Items/Tools";


ItemData.push(...Consumables);
ItemData.push(...Currency);
ItemData.push(...Food);
ItemData.push(...Keys);
ItemData.push(...Resources);
ItemData.push(...Tools);


export default ItemData;