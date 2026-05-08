const Explosives: Proficiency = {

    Name: "Explosives",
    Description: "The Explosives expert is a master of explosives, using grenades and other explosive devices to deal damage and control the battlefield. They can specialize in different types of explosives, such as shrapnel or incendiary grenades, to suit their playstyle.",
    ID: "explosives",

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
        }
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

export default Explosives;