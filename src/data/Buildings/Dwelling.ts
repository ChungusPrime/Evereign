const Dwelling: BuildingData = {
    ID: "dwelling",
    Name: "Dwelling",
    Desc: `The Dwelling provides basic housing for citizens and is essential for the growth of your town.
    It can be upgraded to increase its capacity and provide better living conditions.`,
    Size: { Width: 224, Height: 180 },
    Spritesheet: "Buildings",
    Sprite: "dwelling-1",
    PlotSize: { Width: 224, Height: 180 },
    BaseHousingSlots: 5,
    BaseCost: [
        {
            Tier: 1,
            Resource: 100,
            Amount: 50
        }
    ],
    AggroZone: false,
    Tiers: {
        1: {
            Width: 224,
            Height: 224,
            BaseResourceCost: [
                { Resource: 100, Amount: 50 }
            ]
        }
    },
    RequiresMilestone: 0
};

export default Dwelling;