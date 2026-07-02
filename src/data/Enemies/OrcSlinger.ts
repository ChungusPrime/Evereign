const OrcSlingerData = {
    Name: "Orc Slinger",
    WalkAnimation: "GoblinSlingerWalk",
    Spritesheet: "Orcs",
    SpritesheetFrame: 0,
    IdleFrames: [0, 1, 2, 3],
    MoveFrames: [4, 5, 6, 7],
    AttackRange: 200,
    Type: "Ranged",
    GoldValue: 3,
    ExpValue: 5,
    Defence_Pierce: 0,
    Defence_Impact: 0,
    Defence_Slash: 0,
    Defence_Fire: 0,
    Defence_Cold: 0,
    Defence_Lightning: 0,
    Defence_Poison: 0,
    Defence_Arcane: 0,
    Defence_True: 0,
    Defence_Bleed: 0,
    Defence_Radiant: 0,
    Defence_Corruption: 0,
    Defence_Sonic: 0,
    MaxHealth: 6,
    MovementSpeed: 50,
    AttackCooldown: 1000,
    Temperament: "Hostile",
    Faction: "Klan Gorgutz",
    LootTable: {
        'orc_bow_1': 1,
        'orc_ear': 1,
        'orcish_arrow': 1
    },
    Abilities: {
        'Pinning Shot': {
            Projectile: { Type: "Orcish Arrow", ApplyEffect: { ID: "pinning_shot_debuff", Duration: 2000 } },
            Cooldown: 5000,
            Direction: "Player",
            CooldownMax: 5000,
            Velocity: 200,
            Damage: {
                1: [
                    { Type: "Pierce", Min: 12, Max: 18 }
                ],
                2: [
                    { Type: "Pierce", Min: 18, Max: 19 }
                ],
                3: [
                    { Type: "Pierce", Min: 18, Max: 19 }
                ],
                4: [
                    { Type: "Pierce", Min: 27, Max: 45}
                ],
                5: [
                    { Type: "Pierce", Min: 84, Max: 125 }
                ],
            }
        },
        'Bow Shot': {
            Projectile: { Type: "Orcish Arrow" },
            Cooldown: 2000,
            Direction: "Player",
            CooldownMax: 2000,
            Velocity: 150,
            Damage: {
                1: [
                    { Type: "Pierce", Min: 18, Max: 19 }
                ],
                2: [
                    { Type: "Pierce", Min: 18, Max: 19 }
                ],
                3: [
                    { Type: "Pierce", Min: 14, Max: 35 }
                ],
                4: [
                    { Type: "Pierce", Min: 42, Max: 56 }
                ],
                5: [
                    { Type: "Pierce", Min: 61, Max: 70 }
                ],
            }
        },
    },
    Lines: [
        "You will not pass!",
        "I will crush you!",
        "You are no match for me!",
        "Prepare to meet your doom!",
        "I will make you regret crossing me!",
        "Oi, Man flesh!",
    ]
};

export default OrcSlingerData;