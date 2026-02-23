const Elf: Race = {
    Name: "Elf",
    Description: `Elves are known for their agility and grace. They are skilled in the use of bows and magic, and are often seen as the guardians of the forest.
        They have a natural affinity for nature, and are often able to communicate with animals and plants. Elves are also known for their longevity, often living for hundreds of years.

        Starting Attribute Bonus:
        +2 Expertise, +2 Personality, +1 Fortune

        Starting Trait - Forest Kin:
        - You can see hidden paths in forests on the world map
        - You take reduced damage from natural hazards
        `,
    Traits: ["forest_kin"],
    Skins: ["1", "2", "3"],
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
    Skin: 1,
    Available: false
}

export default Elf;