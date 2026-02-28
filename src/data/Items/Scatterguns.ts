const Scatterguns: ItemData[] = [

    {
        ID: "grandpa_Scattergun",
        Name: "Grandpa's ol' Service Scattergun",
        Sprite: "weapons-293",
        Desc: "Rusty old Scattergun that has seen better days. Still packs a punch, but needs some love.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Velocity: 500,
            Lifetime: 3,
            Cooldown: 1000,
            ReloadTime: 3,
            MagazineSize: 2,
            Spread: 20
        },
        Sound: "Scattergun_fire",
        Moddable: false,
        InitialValue: { ID: "grandpa_Scattergun", Quantity: 1, CurrentMagazine: 2, Ammo: "stone_shot", Cooldown: 0, Mods: {} }
    },

    {
        ID: "scattergun_farmhand",
        Name: "Farmhand's Scattergun",
        Sprite: "weapons-2",
        Desc: "A reliable Scattergun used by farmhands to protect their land from pests and intruders.",
        Stackable: false,
        Properties: {
            Damage: [
                { Type: "Piercing", Amount: 3 },
                { Type: "Force", Amount: 6 }
            ],
            Velocity: 90,
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
        InitialValue: { ID: "scattergun_farmhand", Quantity: 1, CurrentMagazine: 0, Mods: { "Barrel": null }, Ammo: null }
    },

    {
        ID: "Scattergun_bronze",
        Name: "Bronze Scattergun",
        Sprite: "weapons-2",
        Desc: "A sturdy Scattergun made of bronze, offering a balance between power and reliability.",
        Stackable: false,
        Properties: {
            Damage: [
                { Type: "Piercing", Amount: 7 },
                { Type: "Force", Amount: 12 }
            ],
            Velocity: 80,
            Lifetime: 4,
            Cooldown: 900,
            ReloadTime: 2.8,
            Pellets: 8,
            MagazineSize: 4,
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
        InitialValue: { ID: "Scattergun_bronze", Quantity: 1, CurrentMagazine: 6, Mods: { "Barrel": null, "Stock": null }, Ammo: null }
    },

    {
        ID: "Scattergun_iron",
        Name: "Iron Scattergun",
        Sprite: "weapons-2",
        Desc: "A robust Scattergun forged from iron, providing enhanced durability and firepower.",
        Stackable: false,
        Properties: {
            Damage: [
                { Type: "Piercing", Amount: 8 },
                { Type: "Force", Amount: 14 }
            ],
            Velocity: 90,
            Lifetime: 4.5,
            Cooldown: 850,
            ReloadTime: 2.5,
            Pellets: 8,
            MagazineSize: 5,
        },
        Sound: "Scattergun_fire",
        Moddable: true,
        Craftable: true,
        ModdableParts: ["Barrel", "Stock"],

        Crafting: {
            Skill: "Smithing",
            SkillXP: 50,
            Materials: [
                { ID: "iron_ingot", Amount: 5 },
                { ID: "oak_plank", Amount: 2 }
            ],
        },

        InitialValue: { ID: "Scattergun_iron", Quantity: 1, CurrentMagazine: 6, Mods: { "Barrel": null, "Stock": null }, Ammo: null }
    },

    {
        ID: "Scattergun_steel",
        Name: "Steel Scattergun",
        Sprite: "weapons-2",
        Desc: "A powerful Scattergun crafted from steel, designed for those who demand more firepower.",
        Stackable: false,
        Properties: {
            Damage: [
                { Type: "Pierce", Amount: 4 },
                { Type: "Impact", Amount: 6 }
            ],
            Velocity: 100,
            Lifetime: 5,
            Cooldown: 800,
            ReloadTime: 2.5,
            Pellets: 8,
            MagazineSize: 6,
        },
        Sound: "Scattergun_fire",
        Moddable: true,
        Craftable: true,
        ModdableParts: ["Barrel", "Stock"],
        Crafting: {
            Skill: "Smithing",
            SkillXP: 50,
            Materials: [
                { ID: "iron_ingot", Amount: 5 },
                { ID: "oak_plank", Amount: 2 }
            ],
        },
        InitialValue: { ID: "Scattergun_steel", Quantity: 1, CurrentMagazine: 8, Mods: { "Barrel": null, "Stock": null, "Muzzle": null }, Ammo: null }
    },


];

Scatterguns.forEach((item) => {
    item.Category = "Weapon";
    item.Type = "Scattergun";
    item.Properties.AmmoType = "Shot";
});

export default Scatterguns;