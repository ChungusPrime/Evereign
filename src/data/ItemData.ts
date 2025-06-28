const ItemData: { [key: string]: ItemData } = {};

import ChestArmour from "./Items/Armour_Chest";
import Staffs from "./Items/Staffs";
import HeadArmour from "./Items/Armour_Head";
import Consumables from "./Items/Consumables";
import Ammunition from "./Items/Ammunition";
import Currency from "./Items/Currency";
import Food from "./Items/Food";
import Keys from "./Items/Keys";
import Resources from "./Items/Resources";
import Tools from "./Items/Tools";
import Scatterguns from "./Items/Scatterguns";
import ProtoStructComponents from "./Items/ProtoStructComponents";
import FeetArmour from "./Items/Armour_Feet";
import HandArmour from "./Items/Armour_Hands";
import LegArmour from "./Items/Armour_Legs";

// Helper function to add items from an array to ItemData
function addItems(items: ItemData[]) {
    items.forEach(item => {
        ItemData[item.ID] = item;
    });
}

// Add all items
addItems(Scatterguns);
addItems(Staffs);
addItems(ChestArmour);
addItems(FeetArmour);
addItems(HandArmour);
addItems(HeadArmour);
addItems(LegArmour);
addItems(Consumables);
addItems(Ammunition);
addItems(Currency);
addItems(Food);
addItems(Keys);
addItems(Resources);
addItems(Tools);
addItems(ProtoStructComponents);

export default ItemData;