const ScattergunTraits: Record<string, Trait> = {

    "scattergun_master": {
        Name: "Scattergun Master",
        Description: `Master training on how to use Scatterguns.
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "scattergun_expert",
        ],
        RequiredAttributes: {
            Versatility: 25,
        }
    },

    "scattergun_expert": {
        Name: "Scattergun Expert",
        Description: `Expert training on how to use Scatterguns.
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "scattergun_journeyman",
        ],
        RequiredAttributes: {
            Versatility: 20,
        }
    },

    "scattergun_journeyman": {
        Name: "Scattergun Journeyman",
        Description: `Advanced training on how to use Scatterguns.
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "scattergun_apprentice",
        ],
        RequiredAttributes: {
            Versatility: 15,
        }
    },

    "scattergun_apprentice": {
        Name: "Scattergun Apprentice",
        Description: `Intermediate training on how to use Scatterguns.
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "scattergun_novice",
        ],
        RequiredAttributes: {
            Versatility: 10,
        }
    },

    "scattergun_novice": {
        Name: "Scattergun Novice",
        Description: `Basic training on how to use Scatterguns.`,
        RequiredTraits: [],
        RequiredAttributes: {
            Versatility: 5,
        }
    },

    "shoot-n-scoot": {
        Name: "Shoot-n-Scoot",
        Description: `After firing a Scattergun, gain a burst of movement speed for 2 seconds. This effect has a cooldown of 5 seconds.`,
    },

    "double_tap": {
        Name: "Double Tap",
        Description: `Fire an additional shot immediately after firing a Scattergun. This effect has a cooldown of 10 seconds.`,
    },

    "scattershot": {
        Name: "Scattershot",
        Description: `Scattergun shots have a 20% chance to fire an additional pellet in a random direction.`,
    },

    "buckshot": {
        Name: "Buckshot",
        Description: `Scattergun shots have a 20% chance to fire an additional pellet directly forward.`,
    },

    "ricochet": {
        Name: "Ricochet",
        Description: `Scattergun pellets have a 20% chance to ricochet off surfaces, hitting additional targets.`,
    },

    "close_quarters_expert": {
        Name: "Close Quarters Expert",
        Description: `Scattergun shots have a 20% chance to deal increased damage based on how close the target is.`,
    },

    "scatter_and_pray": {
        Name: "Scatter and Pray",
        Description: `Scattergun shots have a 20% chance to ignore a portion of the target's armor.`,
    },

    "overpenetration": {
        Name: "Overpenetration",
        Description: `Scattergun pellets have a 20% chance to pass through targets, hitting additional enemies in a line.`,
    },

    "shotgun_rain": {
        Name: "Shotgun Rain",
        Description: `After firing a Scattergun, there is a 20% chance to create a small area of effect at the target location that deals damage over time for 5 seconds.`,
    },

    "scattergun_slinger": {
        Name: "Scattergun Slinger",
        Description: `Gain a 20% chance to fire an additional Scattergun shot that targets a random nearby enemy.`,
    },

    "close_range_expert": {
        Name: "Close Range Expert",
        Description: `Scattergun shots have a 20% chance to deal increased damage based on how close the target is.`,
    },

    "scattergun_guru": {
        Name: "Scattergun Guru",
        Description: `Gain a 20% chance to fire an additional Scattergun shot that targets a random nearby enemy.`,
    }

}