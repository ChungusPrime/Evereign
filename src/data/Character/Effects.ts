const Effects: EffectData[] = [

    {
        ID: "burn_1",
        Name: "Burn",
        Description: "A burning effect that deals damage over time.",
        Duration: 5000,
        TickRate: 1000,
        Intensity: 10
    },

    {
        ID: "bleed_1",
        Name: "Bleed",
        Description: "A bleeding effect that deals damage over time.",
        Duration: 5000,
        TickRate: 1000,
        Intensity: 10
    },

    {
        ID: "voltaic_shock_1",
        Name: "Voltaic Shock",
        Description: "An electric shock that stuns the target and deals damage over time.",
        Duration: 3000,
        TickRate: 1000,
        Intensity: 15
    },

    {
        ID: "pinned_1",
        Name: "Pinned",
        Description: "A pinning effect that immobilizes the target.",
        Duration: 4000,
        TickRate: 0,
        Intensity: 0
    }

];

export default Effects;