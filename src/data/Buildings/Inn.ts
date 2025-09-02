const InnData: BuildingData = {
    ID: "inn",
    Name: "Inn",
    Desc: `The Inn provides a place for travelers to rest and recover. It can also serve as a gathering place for locals.`,
    Spritesheet: "Buildings",
    Sprite: "inn-1",
    Size: { Width: 224, Height: 224 },
    BaseHousingSlots: 10,
    BaseCost: [
        {
            Tier: 1,
            Resource: 150,
            Amount: 75
        }
    ],
    AggroZone: false,
    Tiers: {
        1: {
            Width: 224,
            Height: 224,
            BaseResourceCost: [
                { Resource: 150, Amount: 75 }
            ]
        }
    },
    RequiresMilestone: 0
};

export default InnData;