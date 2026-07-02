const Bombs: Proficiency = {

    Name: "Bombs",
    Description: "The Bombs expert is a master of explosives, using grenades and alchemical mixes to deal damage and control the battlefield.",
    ID: "bombs",

    Abilities: [
        {
            ID: "shrap_charge",
            Name: "Shrap Charge",
            Description: "The next grenade you throw will send shrapnel flying in all directions, dealing Bleed damage to all enemies in the area.",
            mana_cost: 10,
            sprite: "SkillsB-190",
            type: "Buff",
            cooldown: 12000,
            requires_weapon_equipped: false,
            requires_trait: "explosives_novice",
            OnUse: [
                { ApplyEffect: { ID: "shrap_charge", Stacks: 1, Duration: 3000 } },
            ]
        },
        {
            ID: "banger_nine",
            Name: "Banger-Nine",
            Description: "Throw a concussion grenade that explodes 9 times, dealing Sonic damage and disorienting enemies in the area for a short time.",
            mana_cost: 10,
            sprite: "SkillsB-190",
            type: "Buff",
            cooldown: 12000,
            requires_weapon_equipped: false,
            requires_trait: "explosives_novice",
            OnUse: [
                {
                    SpawnThrowable: { 
                        Type: "Banger-Nine Grenade",
                        Quantity: 1,
                        Direction: "Mouse",
                        Velocity: 320,
                        Contact: false,
                        Explosion: {
                            Quantity: 9,
                            ExplosionDelay: 100,
                            Fuse: true,
                            FuseTime: 2000,
                            Radius: 128,
                            ApplyEffect: { ID: "disoriented", Duration: 3000, Stacks: 1 },
                            Damage: [
                                { Type: "Sonic", Amount: 5 }
                            ]
                        }
                    }
                },
                
            ]
        },
        {
            ID: "corrosive_flask",
            Name: "Corrosive Flask",
            Description: "Throw a flask that shatters on contact, releasing a corrosive substance, dealing Acid damage over time to enemies in the area.",
            mana_cost: 10,
            sprite: "SkillsB-190",
            type: "Buff",
            cooldown: 12000,
            requires_weapon_equipped: false,
            requires_trait: "explosives_novice",
            OnUse: [
                {
                    SpawnThrowable: {
                        Type: "Corrosive Flask",
                        Direction: "Mouse",
                        Velocity: 320,
                        Quantity: 1,
                        Contact: true,
                        LeaveAreaEffect: {
                            Type: "Corrosive Cloud",
                            Duration: 5000,
                            TickRate: 1000,
                            Radius: 128,
                            Damage: [
                                { Type: "Acid", Amount: 5 }
                            ]
                        }
                    }
                }
            ]

        },
    ],

    Traits: [
        {
            ID: "explosives_novice",
            Name: "Explosives Novice",
            Description: "Your grenades have a chance to not consume mana.",
            sprite: "SkillsB-46",
        },
        {
            ID: "explosives_expert",
            Name: "Explosives Expert",
            Description: "Your grenades have a higher chance to not consume mana.",
            sprite: "SkillsB-47",
        },
        {
            ID: "explosives_master",
            Name: "Explosives Master",
            Description: "Your grenades have a very high chance to not consume mana.",
            sprite: "SkillsB-48",
        },
    ],
    

};

export default Bombs;