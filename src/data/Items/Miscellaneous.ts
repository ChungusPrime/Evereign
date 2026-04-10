const Miscellaneous: ItemData[] = [

    {
        ID: "orc_ear",
        Name: "Orc Ear",
        Sprite: "gems2-45",
        Desc: "A trophy from a slain orc.",
        Stackable: true,
        StackSize: 16
    },

    {
        ID: "orcish_arrow",
        Name: "Broken Orcish Arrow",
        Sprite: "librarium-45",
        Desc: "A crude arrow used by orcs.",
        Stackable: true,
        StackSize: 32
    }

];

Miscellaneous.forEach((item) => {
    item.Category = "Miscellaneous";
});

export default Miscellaneous;
    
    
    
