const Human: Race = {
    Name: "Human",
    Description: `Humans are most known for their adaptability and versatility. They are capable of excelling in any role, and can learn new skills quickly.
        They are also known for their resilience and determination, often overcoming great odds to achieve their goals. They have a natural affinity for 
        exploration and discovery, often seeking out new lands and experiences.

        Starting Attribute Bonus:
        +2 Versatility
        +2 Expertise
        +1 Vigor

        Starting Traits -
        
        Well Connected:
        Each Town Centre you build gives you a free random worker

        On the Frontier:
        Defensive structures are slightly cheaper to build`,

    Traits: ["well_connected", "on_the_frontier"],

    Skins: ["1", "2", "3"],

    Skin: 0,

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
    Available: true
}

export default Human;