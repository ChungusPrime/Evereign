const ItemData: { [key: string]: ItemData } = {};

import Armour_Leather_Head from "./Items/Armour_Leather_Head";
import Armour_Leather_Chest from "./Items/Armour_Leather_Chest";
import Armour_Leather_Hands from "./Items/Armour_Leather_Hands";
import Armour_Leather_Legs from "./Items/Armour_Leather_Legs";
import Armour_Leather_Feet from "./Items/Armour_Leather_Feet";
import Armour_Cloth_Head from "./Items/Armour_Cloth_Head";
import Armour_Cloth_Chest from "./Items/Armour_Cloth_Chest";
import Armour_Cloth_Hands from "./Items/Armour_Cloth_Hands";
import Armour_Cloth_Legs from "./Items/Armour_Cloth_Legs";
import Armour_Cloth_Feet from "./Items/Armour_Cloth_Feet";
import Armour_Chainmail_Head from "./Items/Armour_Chainmail_Head";
import Armour_Chainmail_Chest from "./Items/Armour_Chainmail_Chest";
import Armour_Chainmail_Hands from "./Items/Armour_Chainmail_Hands";
import Armour_Chainmail_Legs from "./Items/Armour_Chainmail_Legs";
import Armour_Chainmail_Feet from "./Items/Armour_Chainmail_Feet";
import Armour_Plate_Chest from "./Items/Armour_Plate_Chest";
import Armour_Plate_Head from "./Items/Armour_Plate_Head";
import Armour_Plate_Hands from "./Items/Armour_Plate_Hands";
import Armour_Plate_Legs from "./Items/Armour_Plate_Legs";
import Armour_Plate_Feet from "./Items/Armour_Plate_Feet";
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
import Swords from "./Items/Swords";
import Hammers from "./Items/Hammers";
import Potions from "./Items/Potions";
import Blueprints from "./Items/Blueprints";

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
addItems(Armour_Leather_Head);
addItems(Armour_Leather_Chest);
addItems(Armour_Leather_Hands);
addItems(Armour_Leather_Legs);
addItems(Armour_Leather_Feet);
addItems(Armour_Chainmail_Head);
addItems(Armour_Chainmail_Chest);
addItems(Armour_Chainmail_Hands);
addItems(Armour_Chainmail_Legs);
addItems(Armour_Chainmail_Feet);
addItems(Armour_Cloth_Head);
addItems(Armour_Cloth_Chest);
addItems(Armour_Cloth_Hands);
addItems(Armour_Cloth_Legs);
addItems(Armour_Cloth_Feet);
addItems(Armour_Plate_Head);
addItems(Armour_Plate_Chest);
addItems(Armour_Plate_Hands);
addItems(Armour_Plate_Legs);
addItems(Armour_Plate_Feet);
addItems(Consumables);
addItems(Ammunition);
addItems(Currency);
addItems(Food);
addItems(Keys);
addItems(Resources);
addItems(Tools);
addItems(ProtoStructComponents);
addItems(Throwables);
addItems(Swords);
addItems(Hammers);
addItems(Potions);
addItems(Blueprints);

export default ItemData;