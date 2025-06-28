const ProtoStructComponents: ItemData[] = [

    {
        ID: "exposed_wiring_1",
        Name: "Exposed Wiring Mk.1",
        Sprite: "weapons-293",
        Desc: "When struck by a melee attack, reflect 2 Shock damage to the attacker.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Damage: [
                { Type: "Shock", Amount: 2 },
            ],
        },
        Moddable: false,
        InitialValue: { ID: "exposed_wiring_1", Quantity: 1 }
    },
];

ProtoStructComponents.forEach((item) => {
    item.Category = "Component";
    item.Type = "Proto Struct";
});

export default ProtoStructComponents;