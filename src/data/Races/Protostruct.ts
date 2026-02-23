const Protostruct: Race = {
    Name: "Protostruct",
    Description: `Proto-Structs are mechanical constructs created by a long gone race of ancient Dwarves, designed to serve and protect. The original designs have been lost to time, but many races
    have replicated the Proto-Struct with their own unique designs. They have a natural affinity for technology, and are often able to interface with ancient machines and devices.
    Proto-Structs are very versatile, able to adapt to a variety of roles and functions as needed on account of their modular design.

    Starting Attribute Bonus:
    Proto-Structs do not receive any attribute bonuses, but they do gain access to unique equipment slots that allow for the installation of components to improve various 
    aspects of the Proto-Struct. The components that can be installed are varied, and can improve attributes, resistances, or provide unique abilities.
    Proto-Structs also do not gain attribute points on level up, instead, one component slot is gained every level.

    Starting Trait - Ultris-grade Unit:
    - Start with 3 component slots, and gain one additional component slot every level
    - You can interface with ancient machines and devices
    `,
    Skin: 3,
    Available: true,
    Traits: ["ultris_grade_unit"],
    Attributes: {},
    Items: {
        Component_1: { ID: "salvaged_micro_replication_unit_1", Quantity: 1 },
        Component_2: { ID: "salvaged_crodite_plate_lv1", Quantity: 1 },
        Component_3: { ID: "salvaged_sustain_unit_1", Quantity: 1 },
    },
    Skins: []
}

export default Protostruct;