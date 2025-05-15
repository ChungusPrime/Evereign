import Consumables from "./Items/Consumables";
import Currency from "./Items/Currency";
import Food from "./Items/Food";
import Keys from "./Items/Keys";
import Resources from "./Items/Resources";
import Tools from "./Items/Tools";
import Weapons from "./Items/Weapons";

const ItemData: ItemData[] = [];

ItemData.push(...Consumables);
ItemData.push(...Currency);
ItemData.push(...Food);
ItemData.push(...Keys);
ItemData.push(...Resources);
ItemData.push(...Tools);
ItemData.push(...Weapons);

export default ItemData;