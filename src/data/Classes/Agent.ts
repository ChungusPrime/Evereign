const Agent: Class = {

    Name: "Agent",
    
    Description: `Agents fill many roles within the kingdom. Usually working alone as scouts, spies, or assassins, they often work in the shadows to gather information and 
    eliminate threats before they have a chance to act, but are also capable enforcers of the law, protecting the kingdom from those who would do it harm.
    Agents are skilled in the use of scatterguns, explosives, and have some knowledge of Gadgetry, making them versatile combatants.`,

    Proficiencies: [
        "Leather",
        "Scatterguns",
        "Bombs",
        "Mechanostructs",
        "Gadgets"
    ],

    Abilities: [
        "voltaic_net",
        "pyro_blast",
        "charged_slug"
    ],

    Traits: [
        "keen_eye",
        "demolition_expert",
        "tactical_insight"
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
        1: { Type: "Ability", ID: "pyro_blast"},
        2: { Type: "Ability", ID: "charged_slug"},
        3: { Type: "Item", ID: "marigold_brew" },
        4: { Type: "Item", ID: "stone_shot" },
        5: { Type: "Item", ID: "grenade_mk1" },
    },
    Items: {
        Equipment_MainHand: { ID: "grandpa_scattergun", Quantity: 1 },
        Equipment_Chest: { ID: "agent_coat", Quantity: 1 },
        Equipment_Head: { ID: "agent_face_cover", Quantity: 1 },
        Equipment_Hands: { ID: "agent_gloves", Quantity: 1 },
        Equipment_Feet: { ID: "agent_boots", Quantity: 1 },
        Equipment_Legs: { ID: "agent_legguards", Quantity: 1 },
        1: { ID: "marigold_brew", Quantity: 5 },
        2: { ID: "stone_shot", Quantity: 100 },
        3: { ID: "grenade_mk1", Quantity: 5 }
    },
    UniqueBuilding: "Arco-Tech Support Relay",
    Available: true

}

export default Agent;