const Throwables: ItemData[] = [

    {
        ID: "grenade_mk1",
        Name: "Grenade Mk1",
        Sprite: "ownmisc-0",
        Desc: "A basic grenade that explodes after a short delay, dealing damage to enemies in a small radius.",
        Stackable: true,
        StackSize: 20,
        OnUse: {
            SpawnThrowable: {
                Type: "Grenade",
                Direction: "Mouse",
                Velocity: 320,
                Quantity: 1,
                Explosion: {
                    Quantity: 1,
                    ExplosionDelay: 0,
                    Fuse: true,
                    FuseTime: 2000,
                    Radius: 128,
                    Damage: [
                        { Type: "Impact", Amount: 10 },
                        { Type: "Fire", Amount: 10 }
                    ]
                }
            }
        },
        InitialValue: { ID: "grenade_mk1", Quantity: 1, Cooldown: 0 },
        Craftable: true,
        Moddable: false,
    },

];

Throwables.forEach((item) => {
    item.Category = "Throwable";
});

export default Throwables;