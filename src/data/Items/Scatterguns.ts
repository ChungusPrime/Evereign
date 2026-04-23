const Scatterguns: ItemData[] = [

    {
        ID: "grandpa_scattergun",
        Name: "Grandpa's ol' Service Scattergun",
        Sprite: "weapons-293",
        Desc: "Rusty old Scattergun that has seen better days. Still packs a punch, but needs some love.",
        Stackable: false,
        Craftable: false,
        Moddable: false,
        Properties: {
            Velocity: 500,
            Lifetime: 3,
            Cooldown: 1000,
            ReloadTime: 3,
            MagazineSize: 2,
            Spread: 20
        },
        Sound: "Scattergun_fire",
        Tags: [2, 4, 45],
        InitialValue: { ID: "grandpa_scattergun", Quantity: 1, CurrentMagazine: 2, Ammo: "stone_shot", Cooldown: 0, Mods: {} }
    },

    {
        ID: "scattergun_farmhand",
        Name: "Farmhand's Scattergun",
        Sprite: "weapons-2",
        Desc: "A reliable Scattergun used by farmhands to protect their land from predators and intruders.",
        Stackable: false,
        Properties: {
            Damage: [
                { Type: "Piercing", Amount: 3 },
                { Type: "Force", Amount: 6 }
            ],
            Velocity: 500,
            Lifetime: 4,
            Cooldown: 900,
            ReloadTime: 2.8,
            Pellets: 8,
            MagazineSize: 3,
        },
        Sound: "Scattergun_fire",
        Moddable: true,
        Craftable: true,
        ModdableParts: ["Barrel"],
        Crafting: {
            Skill: "Smithing",
            SkillXP: 50,
            Materials: [
                { ID: "iron_ingot", Amount: 5 },
                { ID: "oak_plank", Amount: 2 }
            ],
        },
        Tags: [2, 4, 45],
        InitialValue: { ID: "scattergun_farmhand", Quantity: 1, CurrentMagazine: 0, Mods: { "Barrel": null }, Ammo: null, Cooldown: 0 }
    },

    {
        ID: "scatterpistol_bandit",
        Name: "Bandit's Scatterpistol",
        Sprite: "weapons-2",
        Desc: "A scrappy Scatterpistol mainly used by ne'er-do-wells who can't get their hands on anything better.",
        Stackable: false,
        Properties: {
            Damage: [
                { Type: "Piercing", Amount: 2 },
                { Type: "Force", Amount: 3 }
            ],
            Velocity: 400,
            Lifetime: 4,
            Cooldown: 500,
            ReloadTime: 2.5,
            Pellets: 6,
            MagazineSize: 5,
        },
        Sound: "Scattergun_fire",
        Moddable: true,
        Craftable: true,
        ModdableParts: ["Barrel"],
        Crafting: {
            Skill: "Smithing",
            SkillXP: 50,
            Materials: [
                { ID: "iron_ingot", Amount: 3 },
                { ID: "oak_plank", Amount: 1 }
            ],
        },
        Tags: [1, 4],
        InitialValue: { ID: "scatterpistol_bandit", Quantity: 1, CurrentMagazine: 0, Mods: { "Barrel": null }, Ammo: null, Cooldown: 0 }
    },

];

Scatterguns.forEach((item) => {
    item.Category = "Weapon";
    item.Type = "Scattergun";
    item.Properties.AmmoType = "Shot";
});

export default Scatterguns;