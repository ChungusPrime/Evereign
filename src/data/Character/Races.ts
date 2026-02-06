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
        Skins: [],
        Skin: 1,
        Available: false
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
        Skin: 3,
        Available: true,
        Traits: ["ultris_grade_unit"],
        Attributes: {},
        Items: {
            Component_1: { ID: "salvaged_micro_replication_unit_1", Quantity: 1 },
            Component_2: { ID: "salvaged_crodite_plate_lv1", Quantity: 1 },
            Component_3: { ID: "salvaged_sustain_unit_1", Quantity: 1 },
        },
        Skins: []
    },

    {
        Skin: 4,
        Available: true,
        Name: "Morvenite",
        Description: `Morvenites are a mysterious and ancient race of beings, known for their connection to the arcane and their mastery of magic. They are often seen as the 
        keepers of ancient knowledge and are highly respected for their wisdom and insight. They have a natural affinity for magical energies, and are often able to sense and manipulate these forces with ease. 
        Morvenites are also known for their longevity, often living for several centuries.

        Starting Attribute Bonus:
        +2 Arcana, +2 Expertise

        Starting Trait - Arcane Scholar:
        - You gain additional experience when using magical abilities
        - You can identify magical items more easily
        `,
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
        Skins: []
    },

    {

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
    },

    {
        Skin: 5,
        Available: true,
        Name: "Kirupean",
        Description: `Kirupeans are an enigmatic race, known for their elusive nature and mastery of stealth. They are often seen as spies and assassins, using their agility and cunning to outmaneuver their foes. 
        Kirupeans have a natural affinity for the shadows, allowing them to blend into their surroundings with ease. Kirupeans are also known for their sharp senses, often able to detect danger before it arrives.

        Starting Attribute Bonus:
        +2 Personality, +2 Fortune

        Starting Trait - Shadow Walker:
        - You can move silently and hide more easily
        - You have advantage on stealth checks
        `,
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
        Skins: []
    },

    {
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
    },

    {
        Skin: 7,
        Available: true,
        Name: "Tiseri",
        Description: `Tiseri are descendents of a demonic realm, known for their grace and agility. They are skilled swordsmen, and are often seen as explorers and adventurers.
        Tiseri have a natural affinity for war, allowing them to excel in combat and tactics. Tiseri are also known for their charisma, often able to charm and persuade others to their cause. 

        Starting Attribute Bonus:
        +2 Personality, +2 Grit

        Starting Trait - Demonborn Heritage:
        - You have resistance to fire damage
        - You can see in darkness
        `,
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
        },
        Skins: []
    },

    {
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

];

export default RaceData;