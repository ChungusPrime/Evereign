const Drakonid: Race = {
    Skin: 8,
    Available: true,
    Name: "Drakonid",
    Description: `Drakonids are a dragon-based lifeform, known for their strength and resilience. They are skilled in the use of heavy weapons and armor, and are often seen as protectors and guardians.
        Drakonids have a natural affinity for elemental magic, allowing them to harness the power of fire, ice, and lightning. Drakonids are also known for their wisdom, often able to provide guidance and counsel to others.

        Starting Attribute Bonus:
        +2 Fortitude, +2 Grit

        Starting Trait - Dragonkin Resilience:
        - You have resistance to one type of elemental damage (fire, ice, or lightning)
        - You have advantage on saving throws against being frightened
        `,
    Traits: ["dragons_might"],
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

export default Drakonid;