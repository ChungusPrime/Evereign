const Captain: Class = {

    Name: "Captain",
    
    Description: `Captains are the backbone of the kingdom's military forces. They are skilled in the use of swords and shields, and are often seen leading troops into battle. 
    Captains are known for their bravery and leadership skills, and are respected by their peers for their ability to inspire those around them to fight for the kingdom's ideals.`,

    Proficiencies: [
        "Leather",
        "Swords",
        "Command",
        "Shouts"
    ],

    AttributeBonuses: {
        Fortitude: 0,
        Versatility: 5,
        Vigor: 3,
        Expertise: 4,
        Arcana: 0,
        Personality: 2,
        Fortune: 2,
        Grit: 2,
    },

    Hotbar: {
        1: { Type: "Ability", ID: "incendiary_shot" },
        2: { Type: "Ability", ID: "shrap_charge"},
        3: { Type: "Ability", ID: "observer_struct"},
        4: { Type: "Item", ID: "marigold_brew" },
        5: { Type: "Item", ID: "stone_shot" },
        6: { Type: "Item", ID: "grenade_mk1" },
    },

    Items: {
        Equipment_MainHand: { ID: "captain_sword", Quantity: 1 },
        Equipment_Chest: { ID: "captain_coat", Quantity: 1 },
        Equipment_Head: { ID: "captain_face_cover", Quantity: 1 },
        Equipment_Hands: { ID: "captain_gloves", Quantity: 1 },
        Equipment_Feet: { ID: "captain_boots", Quantity: 1 },
        Equipment_Legs: { ID: "captain_legguards", Quantity: 1 },
        1: { ID: "marigold_brew", Quantity: 5 },
        2: { ID: "stone_shot", Quantity: 100 },
        3: { ID: "grenade_mk1", Quantity: 5 }
    },

    UniqueBuilding: "Arco-Tech Support Relay",

    Available: true

}

export default Captain;