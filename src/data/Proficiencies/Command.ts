const Command: Proficiency = {

    ID: "command",
    Name: "Command",

    Description: `Command is a proficiency that focuses on leadership and tactical abilities, allowing the character to influence allies and control the battlefield.
    Command abilities are designed to enhance the effectiveness of allies, manipulate enemy behavior, and provide strategic advantages in combat.`,

    PrimaryAttribute: "Personality",

    Abilities: [

        {
            ID: "footman_unit",
            Name: "Summon Footman Unit",
            mana_cost: 15,
            sprite: "SkillsB-15",
            type: "Buff",
            cooldown: 12000,
            CastTime: 1000,
            ActiviationType: "Cast",
            Description: "Summon a unit of 3 Footmen to assist you in battle. The Footmen will automatically attack nearby enemies and follow you until defeated or dismissed.",
            OnUse: [
                { SpawnNPC: { Type: "Footman", Quantity: 3 } },
                { ApplyEffect: { ID: "command_footman_unit", Duration: 60000 } },
            ]
        },

    ],

    Traits: [

        {
            ID: "command_apprentice",
            Name: "Command Apprentice",
            Description: `Allows you to equip and use Command abilities.`,
            sprite: "SkillsB-24",
            RequiredAttributes: {
                Personality: 5,
            }
        },


    ],

}

export default Command;