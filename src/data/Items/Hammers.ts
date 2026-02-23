const Hammers: ItemData[] = [

    {
        ID: "worn_hammer",
        Name: "Worn Hammer",
        Sprite: "weapons-293",
        Desc: "Rusty old hammer that has seen better days. Still packs a punch, but needs some love.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Damage: [
                { Type: "Impact", Amount: 5 },
            ],
            Radius: 80,
            Cooldown: 1000,
        },
        Sound: "Hammer_swing",
        Moddable: false,
        InitialValue: { ID: "worn_hammer", Cooldown: 0, Mods: {} }
    },

];

Hammers.forEach((item) => {
    item.Category = "Hammer";
});

export default Hammers;

