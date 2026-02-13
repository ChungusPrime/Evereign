const Cryomancer: Proficiency = {

    Name: "Cryomancer",
    Description: "The Cryomancer is a master of ice magic, using their abilities to freeze and slow enemies. They can specialize in different types of ice magic, such as frost bolts or ice shields, to suit their playstyle.",
    ID: "cryomancer",

    Abilities: [
        {
            ID: "frost_field",
            Name: "Frost Field",
            Description: "Summon a cloud of ice, slowing movement speed.",
            type: "Projectile",
            mana_cost: 0,
            sprite: "SkillsA-1",
        },
    ],

    Traits: [
        {
            ID: "ice_novice",
            Name: "Ice Novice",
            Description: "Your ice abilities have a chance to not consume mana.",
        },

        {
            ID: "ice_expert",
            Name: "Ice Expert",
            Description: "Your ice abilities have a higher chance to not consume mana.",
        },

        {
            ID: "ice_master",
            Name: "Ice Master",
            Description: "Your ice abilities have a very high chance to not consume mana.",
        },
    ],

}

export default Cryomancer;