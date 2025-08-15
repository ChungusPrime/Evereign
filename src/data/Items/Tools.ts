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
    },
    {
        ID: "botany_kit",
        Name: "Botany Kit",
        Sprite: "librarium-45",
        Desc: "A kit containing tools for studying and collecting plants.",
        Type: "Botany Kit",
        Stackable: false
    },
    {
        ID: "lockpick_set",
        Name: "Lockpick Set",
        Sprite: "librarium-45",
        Desc: "A set of tools for picking locks.",
        Type: "Lockpick Set",
        Stackable: false
    },
    {
        ID: "blast_charge",
        Name: "Blast Charge",
        Sprite: "librarium-45",
        Desc: "A charge used for blasting rocks and other obstacles.",
        Type: "Blast Charge",
        Stackable: false
    }

];

Tools.forEach((item) => {
    item.Category = "Tool";
});

export default Tools;