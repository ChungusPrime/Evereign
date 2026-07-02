const Shields: Proficiency = {
    ID: "shields",
    Name: "Shields",
    Description: "You are proficient with shields, allowing you to use them effectively in combat.",

    Abilities: [
        {
            ID: "brace",
            Name: "Brace",
            mana_cost: 15,
            sprite: "SkillsB-15",
            type: "Buff",
            cooldown: 12000,
            ActiviationType: "Instant",
            Description: "Gain 3 stacks of Brace, which automatically blocks the next 3 incoming attacks, lose one stack of Brace for each attack blocked.",
            OnUse: {
                ApplyEffect: { ID: "Brace", Stacks: 3 }
            },
        },
    ],


    Traits: [
        {
            ID: "shield_apprentice",
            Name: "Shield Apprentice",
            Description: `Allows you to equip and use shields.`,
            sprite: "SkillsB-30",
            RequiredTraits: [
                "shield_novice",
            ],
            RequiredAttributes: {
                Versatility: 10,
            }
        },
        {
            ID: "shield_novice",
            Name: "Shield Novice",
            sprite: "SkillsB-31",
            Description: `Basic training on how to use shields.
            - Increases block rating by 500`,
            RequiredTraits: [
                "shield_apprentice",
            ],
            RequiredAttributes: {
                Versatility: 10,
            }
        },
    ]

};

export default Shields;
    