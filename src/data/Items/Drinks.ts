const Blueprints: ItemData[] = [
    
    {
        ID: "wine_01",
        Name: "Bottle of Chateau de la Plonk",
        Sprite: "potions-483",
        Desc: "Exquisite Piss - A fine wine with a deep, complex flavor. Said to be the result of grapes grown in soil enriched with the tears of orphans. Morbid, but delicious.",
        Stackable: true,
        StackSize: 10,
        InitialValue: { ID: "wine_01", Quantity: 1 },
        Craftable: false,
    },

    {
        ID: "wine_02",
        Name: "Mabolo von Noble Rot Boxed Wine",
        Sprite: "potions-483",
        Desc: "A fine wine with a rich, orangey-nutty aroma. Served in a box, because that's cool now.",
        Stackable: true,
        StackSize: 10,
        InitialValue: { ID: "wine_02", Quantity: 1 },
        Craftable: false,
    }

];

Blueprints.forEach((item) => {
    item.Category = "Drink";
});

export default Blueprints;