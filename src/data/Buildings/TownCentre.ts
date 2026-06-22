const TownCentreData: BuildingData = {

    ID: "town_centre",

    Name: "Town Centre",

    Desc: `The Town Centre provides housing for people and projects an area in which other buildings can be built,
    but the Town Centre itself can be placed anywhere, as long as there is enough space. 
    Only one Town Centre can be built per map region.`,

    Size: { 
        Width: 256,
        Height: 256
    },

    Spritesheet: "Buildings",

    Sprite: "towncentre1",
    Type: "Town Centre",

    PlotSize: { 
        Width: 224,
        Height: 180 
    },

    BaseHousingSlots: 5,

    AggroZone: false,

    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 24 },
            { ItemID: "stone_rough", Quantity: 12 }
        ],
        2: [
            { ItemID: "plank_willow", Quantity: 24 },
            { ItemID: "stone_rough", Quantity: 48 },
            { ItemID: "ingot_iron", Quantity: 6 }
        ],
        3: [
            { ItemID: "plank_willow", Quantity: 72 },
            { ItemID: "ingot_steel", Quantity: 24 },
        ]
    },

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