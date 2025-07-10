const Resources: ItemData[] = [

    {
        ID: "log_oak",
        Name: "Oak Log",
        Sprite: "general-21",
        Desc: "A log cut from an oak tree, can be refined and used in various production recipes.",
        Stackable: true,
        StackSize: 10
    },

    {
        ID: "oak_plank",
        Name: "Oak Plank",
        Sprite: "general-21",
        Desc: "A plank cut from an oak log, can be used in various production recipes.",
        Stackable: true,
        StackSize: 10
    },

    {
        ID: "stone_rough",
        Name: "Rough Stone",
        Sprite: "general-60",
        Desc: "Rough chunks of stone that can be refined for use in different applications.",
        Stackable: true,
        StackSize: 10
    },

    {
        ID: "ore_iron",
        Name: "Iron Ore",
        Sprite: "general-62",
        Desc: "Common metal ore, must be refined and processed before it is usable in manufacturing.",
        Stackable: true,
        StackSize: 10
    },

    {
        ID: "marigold",
        Name: "Marigold",
        Sprite: "flowers-32",
        Desc: "A bright yellow flower, commonly found in gardens and fields. It is known for it's light healing properties and is often used in alchemy.",
        Stackable: true,
        StackSize: 10
    },

    {
        ID: "humming_bass",
        Name: "Humming Bass",
        Sprite: "fishing-333",
        Desc: "These shimmering gray-blue fish get their name from a rumor that, at night, you can hear them humming a soothing tune. The truth is, they just fucking stink.",
        Stackable: true,
        StackSize: 5
    },

    {
        ID: "munkles_brightcap",
        Name: "Munkle's Brightcap",
        Sprite: "RA_Cavern_Full-902",
        Desc: "A common mushroom that is very nutritious, it is often used in cooking and alchemy. It is often found growing in muddy areas.",
        Stackable: true,
        StackSize: 10
    },
    
    {
        ID: "bloomberry",
        Name: "Bloomberry",
        Sprite: "RA_Jungle-1179",
        Desc: "A large, bright blue berry that is very sweet, not usually used in food because of it's strange after taste, but is a common ingredient in potions.",
        Stackable: true,
        StackSize: 10
    },

];

Resources.forEach((item) => {
    item.Category = "Resource";
});

export default Resources;