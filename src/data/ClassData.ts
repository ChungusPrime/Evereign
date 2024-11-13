const ClassData: ClassData = {
	
	"Evoker": {
		
		unlocked: true,
		walk_animation: "EvokerWalk",
		classIconSprite: "",
		
		stats: {
			baseHealth: 30,
			maxHealth: 30,
			healthPerLevel: 5,
			baseMana: 100,
			maxMana: 100,
			manaPerLevel: 25,
		},
		
		abilities: {

			"Passive": {
				name: "Arcane Synergy",
				description: "Intellect bonus from equipment grants bonus damage (1dmg x class level) to abilities and increases max mana (3mp x class level).",
				type: "Passive",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-0",
			},
			
			"Ability_1": {
				name: "Kinetic Bolt",
				description: "Fire a bolt of pure energy towards the target",
				type: "Projectile",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				parameters: {
					damage: {
						level: 1,
						upgrades: {
							1: { value: 5, cost: 500 },
							2: { value: 8, cost: 4000 },
							3: { value: 14, cost: 15000 },
							4: { value: 21, cost: 55000 },
							5: { value: 30, cost: 140000 },
						},
					},
					velocity: {
						level: 1,
						upgrades: {
							1: { value: 300, cost: 300 },
							2: { value: 400, cost: 2500 },
							3: { value: 500, cost: 11000 },
							4: { value: 600, cost: 32000 },
							5: { value: 800, cost: 75000 },
						},
					},
					cooldown: {
						level: 1,
						upgrades: {
							1: { value: 1000, cost: 400 },
							2: { value: 850, cost: 3600 },
							3: { value: 700, cost: 12500 },
							4: { value: 550, cost: 42000 },
							5: { value: 400, cost: 85000 },
						},
					},
					legendary: {
						unlocked: false,
						cost: 1000000,
						description: "Bolts now penetrate the first target they hit",
					},
				},
			},
			
			"Ability_2": {
				name: "Dart Volley",
				resource: "Mana",
				resource_cost: 0,
				type: "MultiProjectile",
				sprite: "SkillsA-2",
				cooldown: 2000,
				description: "Fire a burst of slow but powerful arcane darts towards the target",
				unlock_cost: 1000,
				parameters: {
					damage: {
						level: 1,
						upgrades: {
							1: { value: 2, cost: 500 },
							2: { value: 5, cost: 500 },
							3: { value: 9, cost: 500 },
							4: { value: 12, cost: 500 },
							5: { value: 16, cost: 500 },
						},
					},
					projectiles: {
						level: 1,
						upgrades: {
							1: { value: 3, cost: 500 },
							2: { value: 4, cost: 500 },
							3: { value: 5, cost: 500 },
							4: { value: 6, cost: 500 },
							5: { value: 7, cost: 500 },
						},
					},
					resource_cost: {
						level: 1,
						upgrades: {
							1: { value: -4, cost: 500 },
							2: { value: -8, cost: 500 },
							3: { value: -14, cost: 500 },
							4: { value: -19, cost: 500 },
							5: { value: -25, cost: 500 },
						},
					},
					legendary: {
						unlocked: false,
						description: "Ability cast time is halved",
					},
				},
			},
			
			"Ability_3": {
				name: "Blazing Barrage",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-3",
				type: "MultiAreaOfEffect",
				description: "Send several small blasts of fire in a line towards the target",
				unlock_cost: 25000,
				parameters: {
					damage: {
						level: 1,
						upgrades: {
							1: { value: 5, cost: 500 },
							2: { value: 10, cost: 500 },
							3: { value: 15, cost: 500 },
							4: { value: 20, cost: 500 },
							5: { value: 25, cost: 500 },
						},
					},
					radius: {
						level: 1,
						upgrades: {
							1: { value: 50, cost: 500 },
							2: { value: 80, cost: 500 },
							3: { value: 105, cost: 500 },
							4: { value: 135, cost: 500 },
							5: { value: 180, cost: 500 },
						},
					},
					bursts: {
						level: 1,
						upgrades: {
							1: { value: 3, cost: 500 },
							2: { value: 4, cost: 500 },
							3: { value: 5, cost: 500 },
							4: { value: 6, cost: 500 },
							5: { value: 7, cost: 500 },
						},
					},
					legendary: {
						unlocked: false,
						description: "Mana cost is reduced by 100",
					},
				},
			},
			
			"Ability_4": {
				name: "Lightning Storm",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-4",
				type: "AreaOfEffect",
				description: "Unleash a burst of arcane energy at a target location, dealing heavy damage to everything in the blast radius",
				unlock_cost: 100000,
				parameters: {
					damage: {
						level: 1,
						upgrades: {
							1: { value: 30, cost: 500 },
							2: { value: 45, cost: 500 },
							3: { value: 60, cost: 500 },
							4: { value: 80, cost: 500 },
							5: { value: 100, cost: 500 },
						},
					},
					radius: {
						level: 1,
						upgrades: {
							1: { value: 100, cost: 500 },
							2: { value: 200, cost: 500 },
							3: { value: 300, cost: 500 },
							4: { value: 400, cost: 500 },
							5: { value: 500, cost: 500 },
						},
					},
					casttime: {
						level: 1,
						upgrades: {
							1: { value: 2000, cost: 500 },
							2: { value: 1750, cost: 500 },
							3: { value: 1500, cost: 500 },
							4: { value: 1250, cost: 500 },
							5: { value: 1000, cost: 500 },
						},
					},
					legendary: {
						unlocked: false,
						description: "Mana cost is reduced by 100",
					},
				},
			},
		},
	},
	
	"Gladiator": {
		unlocked: false,
		walk_animation: "gladiator_walk",
		classIconSprite: "",

		stats: {
			baseHealth: 30,
			currentHealth: 30,
			maxHealth: 30,
			healthPerLevel: 5,
			baseMana: 100,
			currentMana: 100,
			maxMana: 100,
			manaPerLevel: 25,
			baseIntellect: 0,
			currentIntellect: 0,
			intellectPerLeveL: 3,
		},

		abilities: {
			'Passive': {
				name: "Roar of The Crowd",
				resource: "None",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Killing enemies quickly builds adoration, higher adoration grants more gold on kill",
			},
			'LMB': {
				name: "Trident Thrust",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Thrust your trident towards the mouse pointer, dealing damage to each enemy hit",
				parameters: {
					damage: {
						level: 1,
						upgrades: {
							1: { value: 6, cost: 500 },
							2: { value: 11, cost: 4000 },
							3: { value: 14, cost: 15000 },
							4: { value: 16, cost: 55000 },
							5: { value: 24, cost: 140000 },
						},
					},
					range: {
						level: 1,
						upgrades: {
							1: { value: 50, cost: 300 },
							2: { value: 60, cost: 2500 },
							3: { value: 70, cost: 11000 },
							4: { value: 80, cost: 32000 },
							5: { value: 100, cost: 75000 },
						},
					},
					cooldown: {
						level: 1,
						upgrades: {
							1: { value: 1000, cost: 400 },
							2: { value: 850, cost: 3600 },
							3: { value: 700, cost: 12500 },
							4: { value: 550, cost: 42000 },
							5: { value: 400, cost: 85000 },
						},
					},
					legendary: {
						unlocked: false,
						cost: 1000000,
						description: "",
					},
				},
			},
			'Q': {
				name: "Line Breaker",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Charge forward with your shield, stopping at the first enemy hit. Deal massive damage to the first target, and lesser damage to anyone else in a radius",
			},
			'2': {
				name: "Deafening Roar",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Unleash a battle cry, intimidating all enemies close to you, reducing the damage they deal and increasing damage they take",
			},
			'E': {
				name: "Blade Wall",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Draw two blades and spin to win",
			}
		}

	},
	
	"Godsworn": {
		unlocked: false,
		walk_animation: "godsworn_walk",
		classIconSprite: "",

		stats: {
			baseHealth: 30,
			currentHealth: 30,
			maxHealth: 30,
			healthPerLevel: 5,
			baseMana: 100,
			currentMana: 100,
			maxMana: 100,
			manaPerLevel: 25,
			baseIntellect: 0,
			currentIntellect: 0,
			intellectPerLeveL: 3,
		},

		abilities: {
			'Passive': {
				name: "Cleansing Aura",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Deals holy damage in a small radius around you. Gets stronger with faith stat",
			},
			'LMB': {
				name: "Hammer of Judgement",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Slam your hammer into the ground, dealing damage in a radius",
				parameters: {
					damage: {
						level: 1,
						upgrades: {
							1: { value: 6, cost: 500 },
							2: { value: 11, cost: 4000 },
							3: { value: 14, cost: 15000 },
							4: { value: 16, cost: 55000 },
							5: { value: 24, cost: 140000 },
						},
					},
					range: {
						level: 1,
						upgrades: {
							1: { value: 50, cost: 300 },
							2: { value: 60, cost: 2500 },
							3: { value: 70, cost: 11000 },
							4: { value: 80, cost: 32000 },
							5: { value: 100, cost: 75000 },
						},
					},
					cooldown: {
						level: 1,
						upgrades: {
							1: { value: 1000, cost: 400 },
							2: { value: 850, cost: 3600 },
							3: { value: 700, cost: 12500 },
							4: { value: 550, cost: 42000 },
							5: { value: 400, cost: 85000 },
						},
					},
					legendary: {
						unlocked: false,
						cost: 1000000,
						description: "",
					},
				},
			},
			'Q': {
				name: "Purge the Faithless",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Fire several bolts of cleansing fire",
			},
			'2': {
				name: "Cleansing Aura",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Emit an aura of holy power, damaging enemies within it",
			},
			'E': {
				name: "",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "",
			}
		}

	},
	
	"Operative": {
		unlocked: false,
		walk_animation: "operative_walk",
		classIconSprite: "",

		abilities: {
			'Passive': {
				name: "",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "",
			},
			'LMB': {
				name: "Bracer of Blades",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Throw several knives towards your target",
			},
			'Q': {
				name: "Nine-Bang",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "Throw an explosive device which creates 9 small explosions which damages enemies and reduces their movement speed",
			},
			'2': {
				name: "",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "",
			},
			'E': {
				name: "",
				resource: "Mana",
				resource_cost: 0,
				sprite: "SkillsA-1",
				description: "",
			}
		}

	},
	
	"Harbinger": {
		unlocked: false,
		walk_animation: "harbinger_walk",
		classIconSprite: "",
	},

	"Enginewrite": {
		unlocked: false,
		walk_animation: "harbinger_walk",
		classIconSprite: "",
	}

};

export default ClassData;
