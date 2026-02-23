const MagicFocus: ItemData[] = [

    {
        ID: "tarnished_paladin_emblem",
        Name: "Tarnished Paladin Emblem",
        Sprite: "neck-001",
        Desc: "An emblem once worn by a paladin, now tarnished with age. It still holds a faint aura of divine power.",
        Stackable: false,
        Craftable: false,
        Properties: {
            AllowMiracleCasting: true,
            AllowBlessingCasting: true
        },
        Sound: "MagicFocus_activate",
        Moddable: false,
        InitialValue: { ID: "tarnished_paladin_emblem", Cooldown: 0, Mods: {} },
        Tags: [41, 42,],
    },

];

MagicFocus.forEach((item) => {
    item.Category = "Magic Focus";
});

export default MagicFocus;