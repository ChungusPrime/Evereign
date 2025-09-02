const TownCentreData: BuildingData = {
    ID: "town_centre",
    Name: "Town Centre",
    Desc: `The Town Centre provides housing for people and projects an area in which other buildings can be built,
    but the Town Centre itself can be placed anywhere, as long as there is enough space. 
    Only one Town Centre can be built per map region.`,
    Size: { Width: 224, Height: 180 },
    Spritesheet: "Buildings",
    Sprite: "town-centre-1",
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

export default TownCentreData;