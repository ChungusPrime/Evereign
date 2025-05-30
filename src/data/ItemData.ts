const ItemData: ItemData[] = [];

// Weapons
import Shotguns from "./Items/Shotguns";
ItemData.push(...Shotguns);

import Staffs from "./Items/Staffs";
ItemData.push(...Staffs);

// Armour
import ChestArmour from "./Items/Armour_Chest";
ItemData.push(...ChestArmour);

//import FeetArmour from "./Items/Armour_Feet";
//ItemData.push(...FeetArmour);

//import HandsArmour from "./Items/Armour_Hands";
//ItemData.push(...HandsArmour);

import HeadArmour from "./Items/Armour_Head";
ItemData.push(...HeadArmour);

//import LegsArmour from "./Items/Armour_Legs";
//ItemData.push(...LegsArmour);

// Other Items
import Consumables from "./Items/Consumables";
ItemData.push(...Consumables);

import Ammunition from "./Items/Ammunition";
ItemData.push(...Ammunition);

import Currency from "./Items/Currency";
import Food from "./Items/Food";
import Keys from "./Items/Keys";
import Resources from "./Items/Resources";
import Tools from "./Items/Tools";


ItemData.push(...Currency);
ItemData.push(...Food);
ItemData.push(...Keys);
ItemData.push(...Resources);
ItemData.push(...Tools);

export default ItemData;