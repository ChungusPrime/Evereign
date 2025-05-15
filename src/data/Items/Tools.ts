const Tools: ItemData[] = [

    {
        ID: "pickaxe_bronze",
        Name: "Bronze Pickaxe",
        Sprite: "librarium-45",
        Desc: "A simple pickaxe made of bronze, used for mining.",
        Type: "Pickaxe",
        Stackable: false
    },
    
    {
        ID: "bronze_felling_axe",
        Name: "Bronze Felling Axe",
        Sprite: "librarium-45",
        Desc: "A simple axe made of bronze, used for cutting down trees.",
        Type: "Felling Axe",
        Stackable: false
    },
    {
        ID: "bronze_fishing_rod",
        Name: "Bronze Fishing Rod",
        Sprite: "librarium-45",
        Desc: "A simple fishing rod made of bronze, used for catching fish.",
        Type: "Fishing Rod",
        Stackable: false
    }

];

Tools.forEach((item) => {
    item.Category = "Tool";
});

export default Tools;