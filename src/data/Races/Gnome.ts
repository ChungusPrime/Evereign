const Gnome: Race = {
    Name: "Gnome",
    Description: `Gnomes are known for their ingenuity and creativity. They are skilled in the use of gadgets and technology, and are often seen as the inventors and engineers of the world.
        They have a natural affinity for machinery, and are often able to understand and manipulate complex devices with ease. Gnomes are also known for their curiosity, often seeking out new knowledge and experiences.

        Starting Attribute Bonus:
        +2 Fortitude, +2 Expertise

        Starting Trait - Tinkerer:
        - You can craft gadgets and devices
        - You take reduced damage from mechanical traps
        `,
    Traits: ["tinkerer"],
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
    Skin: 2,
    Available: false
}

export default Gnome;