const ItemData: { [key: string]: ItemData } = {};

import ChestArmour from "./Items/Armour_Chest";
import FeetArmour from "./Items/Armour_Feet";
import HandArmour from "./Items/Armour_Hands";
import LegArmour from "./Items/Armour_Legs";
import HeadArmour from "./Items/Armour_Head";
import Staffs from "./Items/Staffs";
import Consumables from "./Items/Consumables";
import Ammunition from "./Items/Ammunition";
import Currency from "./Items/Currency";
import Food from "./Items/Food";
import Keys from "./Items/Keys";
import Resources from "./Items/Resources";
import Tools from "./Items/Tools";
import Scatterguns from "./Items/Scatterguns";
import ProtoStructComponents from "./Items/ProtoStructComponents";
import Throwables from "./Items/Throwables";
import ScattergunMods from "./Items/Scattergun_Mods";

// Helper function to add items from an array to ItemData
function addItems(items: ItemData[]) {
    items.forEach(item => {
        ItemData[item.ID] = item;
    });
}

// Add all items
addItems(Scatterguns);
addItems(ScattergunMods);
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
addItems(Throwables);

export default ItemData;