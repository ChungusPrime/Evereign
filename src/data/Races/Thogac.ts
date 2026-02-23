const Thogac: Race = {
    Skin: 6,
    Available: true,
    Name: "Thogac",
    Description: `Thogacs are a reptile based lifeform, known for their cunning and adaptability. They are skilled in the use of poisons and toxins, and are often seen as assassins and spies.
        Thogacs have a natural affinity for stealth, allowing them to move silently and avoid detection. Thogacs are also known for their resilience, often able to withstand harsh environments and conditions.

        Starting Attribute Bonus:
        +2 Arcana, +2 Grit

        Starting Trait - Venomous Strike:
        - Your melee attacks have a chance to poison your target, dealing damage over time
        - You have advantage on saving throws against poison effects
        `,
    Traits: ["elders_insight"],
    Attributes: {
        Fortitude: 5,
        Versatility: 5,
        Vigor: 5,
        Expertise: 5,
        Personality: 5,
        Fortune: 5,
        Grit: 5,
        Arcana: 5
    },
    Skins: []
}

export default Thogac;