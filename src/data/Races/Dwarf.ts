const Dwarf: Race = {

    Name: "Dwarf",
    Description: `Dwarves are known for their strength and resilience. They are skilled in the use of axes and hammers, and are often seen as the protectors of the mountain.
        They have a natural affinity for stone and metal, and are often able to sense the presence of precious minerals and gems. Dwarves are also known for their craftsmanship,
        often creating intricate and beautiful works of art from stone and metal.

        Starting Attribute Bonus:
        +2 Fortitude, +2 Vigor, +1 Grit

        Starting Trait - Defence Specialist:
        - You take reduced damage from melee attacks
        - You can build defensive structures at a reduced cost
        `,
    Traits: ["defence_specialist"],
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
    Skins: [],
    Skin: 1,
    Available: false

}

export default Dwarf;