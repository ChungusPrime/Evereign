const Difficulties: { [key: string]: Difficulty } = {

    "Story": {
        ID: "Story",
        Name: "Story",
        Description: `The Story difficulty is designed for players who want to experience the game without the challenge of combat.
        In this mode, enemies will be significantly weaker, and your character will be much more powerful.`,
        EnemyHealthMultiplier: 0.75,
        EnemyDamageMultiplier: 0.75,
        EnemyCountMultiplier: 1
    },

    "Standard": {
        ID: "Standard",
        Name: "Standard",
        Description: `The Standard difficulty is the default mode for the game, providing a balanced experience for players.
        In this mode, enemies will be of a similar strength to your character, and you will need to use strategy and skill to defeat them.
        This mode is the recommended difficulty, especially for your first playthrough.`,
        EnemyHealthMultiplier: 1,
        EnemyDamageMultiplier: 1,
        EnemyCountMultiplier: 1
    },

    "ULTRA": {
        ID: "ULTRA",
        Name: "ULTRA",
        Description: `The ULTRA difficulty is designed for players who want a challenge. You will face hunger and thirst, fatigue, stress and weather conditions that will require you to manage your character's needs 
        in addition to devastating enemies. In this mode, you will need to use all of your skills and resources just to stay alive. Every step could be your last.`,
        EnemyHealthMultiplier: 1.5,
        EnemyDamageMultiplier: 1.5,
        EnemyCountMultiplier: 1
    },

};

export default Difficulties;