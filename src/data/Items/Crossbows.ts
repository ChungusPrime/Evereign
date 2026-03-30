const Scatterguns: ItemData[] = [

    {
        ID: "battered_crossbow",
        Name: "Grandpa's ol' Service Crossbow",
        Sprite: "weapons-293",
        Desc: "Rusty old Crossbow that has seen better days. Still packs a punch, but needs some love.",
        Stackable: false,
        Craftable: false,
        Properties: {
            Velocity: 400,
            Lifetime: 3,
            Cooldown: 100,
            ReloadTime: 4,
            MagazineSize: 20,
            Spread: 10
        },
        Sound: "scattergun_fire",
        Moddable: false,
        InitialValue: { ID: "battered_crossbow", Quantity: 1, CurrentMagazine: 20, Ammo: "stone_bolt", Cooldown: 0, Mods: {} }
    },

];

Scatterguns.forEach((item) => {
    item.Category = "Weapon";
    item.Type = "Crossbow";
    item.Properties.AmmoType = "Bolt";
});

export default Scatterguns;