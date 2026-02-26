const Godsworn: Class = {

    Name: "Godsworn",
    Description: `Godsworn are holy warriors who have dedicated their lives to the service of the divine. They are skilled in the use of hammers and heavy armor, and can channel 
    their divine energy to heal and protect their allies. Godsworn are often seen as the champions of the kingdom, using their strength and faith to protect it from evil.
    They are known for their unwavering devotion to their cause, and their ability to inspire those around them to greatness.`,

    Proficiencies: [
        "Plate",
        "Hammers",
        "Miracles",
        "Blessings"
    ],

    Abilities: [
        "smite",
        "divine_shield",
        "blessing_of_strength"
    ],

    Traits: [
        "divine_fortitude",
        "holy_aura",
        "unshakable_faith"
    ],

    AttributeBonuses: {
        Fortitude: 3,
        Versatility: 2,
        Vigor: 2,
        Expertise: 1,
        Arcana: 0,
        Personality: 4,
        Fortune: 2,
        Grit: 3,
    },
    Hotbar: {
        1: { Type: "Ability", ID: "smite" },
        2: { Type: "Ability", ID: "divine_shield"},
        3: { Type: "Ability", ID: "blessing_of_strength"},
        4: { Type: "Item", ID: "marigold_brew" },
    },
    Items: {
        Equipment_MainHand: { ID: "hammer_godsworn_1", Quantity: 1 },
        Equipment_Chest: { ID: "godsworn_armor_1", Quantity: 1 },
        Equipment_Head: { ID: "godsworn_helmet_1", Quantity: 1 },
        Equipment_Hands: { ID: "godsworn_gauntlets_1", Quantity: 1 },
        Equipment_Feet: { ID: "godsworn_boots_1", Quantity: 1 },
        Equipment_Legs: { ID: "godsworn_legguards_1", Quantity: 1 },
        1: { ID: "marigold_brew", Quantity: 5 },
    },
    UniqueBuilding: "Temple of the Divine",
    Available: false

}

export default Godsworn;