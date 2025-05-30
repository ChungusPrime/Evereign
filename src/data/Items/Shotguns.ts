const Shotguns: ItemData[] = [

    {
        ID: "grandpa_shotgun",
        Name: "Grandpa's ol' Service Shotgun",
        Sprite: "weapons-293",
        Desc: "Rusty old shotgun that has seen better days. Still packs a punch, but needs some love.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Damage: [
                { Type: "Piercing", Amount: 2 },
                { Type: "Force", Amount: 3 }
            ],
            Velocity: 60,
            Lifetime: 3,
            FireRate: 1,
            ReloadTime: 3,
            Pellets: 8,
            MagazineSize: 2,
        },
        Sound: "shotgun_fire",
        Moddable: false,
        InitialValue: { ID: "grandpa_shotgun", Quantity: 1, CurrentMagazine: 4, Ammo: "lead_shot" }
    },

    {
        ID: "shotgun_bronze",
        Name: "Bronze Shotgun",
        Sprite: "weapons-2",
        Desc: "A sturdy shotgun made of bronze, offering a balance between power and reliability.",
        Stackable: false,
        Properties: {
            Damage: 6,
            Velocity: 80,
            Lifetime: 4,
            FireRate: 1,
            ReloadTime: 2.8,
            Pellets: 8,
            MagazineSize: 6,
        },
        Sound: "shotgun_fire",
        Moddable: true,
        Craftable: true,
        ModdableParts: ["Barrel"],
        Materials: [
            { ID: "bronze_ingot", Amount: 5 },
            { ID: "wood_plank", Amount: 2 }
        ],
        InitialValue: { ID: "shotgun_bronze", Quantity: 1, CurrentMagazine: 6, Mods: { "Barrel": null } }
    },
];

Shotguns.forEach((item) => {
    item.Category = "Weapon";
    item.Type = "Shotgun";
    item.Properties.AmmoType = "Shot";
});

export default Shotguns;