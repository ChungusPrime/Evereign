const Evoker: Class = {

    Name: "Evoker",
    Description: `Evokers are powerful magic users who harness the elements to cast devastating spells. They are skilled in the use of staffs and magical devices, and can channel their arcane energy to unleash powerful attacks.
    Evokers are often seen as the guardians of the kingdom, using their magic to protect it from threats both internal and external.
    They are known for their ability to manipulate the elements, using fire, ice, and lightning to devastating effect.`,

    Proficiencies: [
        "Cloth",
        "Staves",
        "Pyromancy",
        "Cryomancy",
    ],

    Abilities: [
        "pyro_burst",
        "frost_field",
        "electro_jab"
    ],

    Traits: [
        "elemental_affinity",
        "arcane_surge",
        "mana_shield"
    ],

    AttributeBonuses: {
        Fortitude: 0,
        Versatility: 0,
        Vigor: 1,
        Expertise: 2,
        Arcana: 5,
        Personality: 2,
        Fortune: 3,
        Grit: 1,
    },
    Hotbar: {
        1: { Type: "Ability", ID: "pyro_burst" },
        2: { Type: "Ability", ID: "frost_field"},
        3: { Type: "Ability", ID: "electro_jab"},
        4: { Type: "Item", ID: "marigold_brew" },
        5: { Type: "Item", ID: "bloomberry_decoction" },
    },
    Items: {
        Equipment_MainHand: { ID: "staff_evoker_1", Quantity: 1 },
        Equipment_Chest: { ID: "evokers_robe", Quantity: 1 },
        Equipment_Head: { ID: "evokers_hood", Quantity: 1 },
        Equipment_Hands: null,
        Equipment_Feet: { ID: "leather_shoes", Quantity: 1 },
        Equipment_Legs: null,
        1: { ID: "marigold_brew", Quantity: 5 },
        2: { ID: "bloomberry_decoction", Quantity: 5 }
    },
    UniqueBuilding: "Arcane Extractor",
    Available: true

}

export default Evoker;