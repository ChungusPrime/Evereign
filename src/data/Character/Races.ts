const RaceData: RaceData[] = [

    {
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

        Attributes: {
            Fortitude: 5,
            Versatility: 5,
            Vigor: 5,
            Expertise: 5,
            Personality: 5,
            Fortune: 5,
            Grit: 5,
            Arcana: 5
        }
    },

    {
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
    },

    {
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
    },
    
    {
        Name: "Proto-Struct",
        Description: `Proto-Structs are mechanical constructs created by a long gone race of ancient Dwarves, designed to serve and protect. The original designs have been lost to time, but many races
        have replicated the Proto-Struct with their own unique designs. They have a natural affinity for technology, and are often able to interface with ancient machines and devices.
        Proto-Structs are very versatile, able to adapt to a variety of roles and functions as needed on account of their modular design.

        Starting Attribute Bonus:
        Proto-Structs do not receive any attribute bonuses, but they do gain access to unique equipment slots that allow for the installation of components to improve various 
        aspects of the Proto-Struct. The components that can be installed are varied, and can improve attributes, resistances, or provide unique abilities.
        Proto-Structs also do not gain attribute points on level up, instead, one component slot is gained every level.

        Starting Trait - Ultris-grade Unit:
        - Start with 3 component slots, and gain one additional component slot every level
        - You can interface with ancient machines and devices
        `,
        Traits: ["ultris_grade_unit"],
        Attributes: {},
        Items: {
            Component_1: { ID: "salvaged_micro_replication_unit_1", Quantity: 1 },
            Component_2: { ID: "salvaged_crodite_plate_lv1", Quantity: 1 },
            Component_3: { ID: "salvaged_sustain_unit_1", Quantity: 1 },
        },

    },

    {
        Name: "Morvenite",
        Description: "Bird-based lifeform",
        Traits: ["bird_resilience"],
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
    },

    {
        Name: "Gnome",
        Description: "Clever and inventive",
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
    },

    {
        Name: "Kirupean",
        Description: "Cat-like, Mysterious and elusive",
        Traits: ["shadow_walker"],
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
    },

    {
        Name: "Thogac",
        Description: "Lizardfolk, Ancient and wise",
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
        }
    },

    {
        Name: "Tiseri",
        Description: "Demon-born, Swift and agile",
        Traits: ["wind_dancer"],
        Attributes: {
            Fortitude: 5,
            Versatility: 5,
            Vigor: 5,
            Expertise: 5,
            Personality: 5,
            Fortune: 5,
            Grit: 5,
            Arcana: 5
        }
    },

    {
        Name: "Drakonid",
        Description: "Dragon-kin, Strong and noble",
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
    }

];

export default RaceData;