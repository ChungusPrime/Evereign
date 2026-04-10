const Ammunition: ItemData[] = [

    {
        ID: "stone_shot",
        Name: "Stone Shot",
        Sprite: "general-15",
        Desc: "A handful of Stone shot, used in Scatterguns.",
        Stackable: true,
        StackSize: 200,
        Type: "Scattergun",
        Properties: {
            DamageMod: [
                { Type: "Impact", Min: 3, Max: 5 }
            ],
            Pellets: 5,
        },
        InitialValue: { ID: "stone_shot", Quantity: 1 },
        Craftable: true,

        Crafting: {
            Skill: "Blacksmithing",
            SkillXP: 10,
            Materials: [
                { ID: "stone_rough", Amount: 1 },
            ],
            Time: 10,
            Output: { ID: "stone_shot", Quantity: 20 },
        },

        Moddable: false,
        Tags: [18, 29],
    },

    {
        ID: "iron_shot",
        Name: "Iron Shot",
        Sprite: "general-15",
        Desc: "A handful of iron shot, used in Scatterguns.",
        Stackable: true,
        StackSize: 200,
        Type: "Scattergun",
        Properties: {
            DamageMod: [
                { Type: "Impact", Min: 3, Max: 5 },
                { Type: "Bleed", Min: 3, Max: 5 },
            ],
            Pellets: 7,
        },
        InitialValue: { ID: "iron_shot", Quantity: 1 },
        
        Moddable: false,

        Craftable: true,
        Crafting: {
            Skill: "Blacksmithing",
            SkillXP: 10,
            Materials: [
                { ID: "iron_ingot", Amount: 1 },
            ],
            Time: 10,
            Output: { ID: "iron_shot", Quantity: 20 },
        },

        Tags: [18, 29],
    },

    {
        ID: "razor_shot",
        Name: "Razor Shot",
        Sprite: "general-15",
        Desc: "A handful of razor shot, used in Scatterguns.",
        Stackable: true,
        StackSize: 200,
        Type: "Scattergun",
        Properties: {
            DamageMod: [
                { Type: "Bleed", Min: 3, Max: 5 },
                { Type: "Slash", Min: 3, Max: 5 },
            ],
            Pellets: 12,
        },
        InitialValue: { ID: "razor_shot", Quantity: 1 },
        Craftable: true,
        Moddable: false,
        Crafting: {
            Skill: "Blacksmithing",
            SkillXP: 10,
            Materials: [
                { ID: "steel_ingot", Amount: 1 },
            ],
            Time: 10,
            Output: { ID: "razor_shot", Quantity: 20 },
        },
        Tags: [18, 29],
    }

];

Ammunition.forEach((item) => {
    item.Category = "Ammunition";
});

export default Ammunition;