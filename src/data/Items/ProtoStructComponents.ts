const ProtoStructComponents: ItemData[] = [

    {
        ID: "exposed_wiring_1",
        Name: "Exposed Wiring Mk.1",
        Sprite: "weapons-293",
        Desc: "When struck by a melee attack, inflict 2 Shock damage to the attacker.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Reflect: [
                { Type: "Shock", Amount: 2 },
            ],
        },
        Moddable: false,
        InitialValue: { ID: "exposed_wiring_1", Quantity: 1 }
    },

    {
        ID: "def_plate",
        Name: "Deflector Plate I",
        Sprite: "weapons-293",
        Desc: "Increases Piercing Resistance by 2.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Defence_Pierce: 2
        },
        Moddable: false,
        InitialValue: { ID: "def_plate", Quantity: 1 }
    },

    {
        ID: "gobbo_target_v1",
        Name: "Goblin Targetting Array V.1",
        Sprite: "weapons-293",
        Desc: "Attacks against goblins deal an additional 2 Pierce damage.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "gobbo_target_v1", Quantity: 1 }
    },

    {
        ID: "expertise_mod_1",
        Name: "Expertise Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Expertise by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "expertise_mod_1", Quantity: 1 }
    },

    {
        ID: "arcana_mod_1",
        Name: "Arcana Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Arcana by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "arcana_mod_1", Quantity: 1 }
    },

    {
        ID: "personality_mod_1",
        Name: "Personality Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Personality by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "personality_mod_1", Quantity: 1 }
    },

    {
        ID: "fortune_mod_1",
        Name: "Fortune Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Fortune by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "fortune_mod_1", Quantity: 1 }
    },

    {
        ID: "grit_mod_1",
        Name: "Grit Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Grit by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "grit_mod_1", Quantity: 1 }
    },

    {
        ID: "vigor_mod_1",
        Name: "Vigor Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Vigor by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "vigor_mod_1", Quantity: 1 }
    },

    {
        ID: "versatility_mod_1",
        Name: "Versatility Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Versatility by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "versatility_mod_1", Quantity: 1 }
    },

    {
        ID: "fortitude_mod_1",
        Name: "Fortitude Data Module I",
        Sprite: "weapons-293",
        Desc: "Increases Fortitude by 1.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "fortitude_mod_1", Quantity: 1 }
    },

];

ProtoStructComponents.forEach((item) => {
    item.Category = "Component";
    item.Type = "Proto Struct";
});

export default ProtoStructComponents;