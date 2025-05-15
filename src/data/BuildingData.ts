const BuildingData: BuildingData[] = [
    
    {
        ID: 1,
        Name: "Town Centre",
        Size: 224,

        PlotSize: { Width: 224, Height: 180 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        Desc: "Town Centre Desc",
        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 25 },
            { Tier: 2, Resource: 2, Amount: 25 },
            { Tier: 3, Resource: 8, Amount: 150 },
        ],
        RequiresMilestone: false
    },
    
    {
        ID: 2,
        Name: "Dwelling",
        Size: 128,
        PlotSize: { Width: 128, Height: 64 },
        Tiers: {
            1: {
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50 }
                ]
            },
            2: {
                Width: 90,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50 }
                ]
            },
            3: {
                Width: 115,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50 }
                ]
            },
            4: {
                Width: 115,
                Height: 102,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50 }
                ]
            },
            5: {
                Width: 116,
                Height: 102,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50 }
                ]
            },
        },
        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 50 }
        ],
        RequiresMilestone: 1,
        Desc: "Dwelling Desc"
    },

    {
        ID: 3,
        Name: "Warehouse",
        Size: 128,

        PlotSize: { Width: 128, Height: 64 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Warehouse Desc"
    },

    {
        ID: 4,
        Name: "Logging Camp",
        Size: 128,

        PlotSize: { Width: 128, Height: 128 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Logging Camp Desc"
    },
    
    {
        ID: 5,
        Name: "Mine",
        Size: 128,

        PlotSize: { Width: 128, Height: 128 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Mine Desc"
    },
    
    {
        ID: 6,
        Name: "Farm",
        Size: 128,

        PlotSize: { Width: 224, Height: 180 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Farm Desc"
    },

    {
        ID: 7,
        Name: "Market",
        Size: 128,

        PlotSize: { Width: 128, Height: 64 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Trade Post Desc"
    },

    {
        ID: 8,
        Name: "Inn",
        Size: 128,

        PlotSize: { Width: 128, Height: 64 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Trade Post Desc"
    },

    {
        ID: 9,
        Name: "Goblin Outpost",
        Size: 128,

        PlotSize: { Width: 128, Height: 128 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Trade Post Desc"
    },

    {
        ID: 10,
        Name: "Goblin Tower",
        Size: 128,

        PlotSize: { Width: 128, Height: 128 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Trade Post Desc"
    },

    {
        ID: 11,
        Name: "Goblin Stronghold",
        Size: 128,

        PlotSize: { Width: 128, Height: 128 },

        Tiers: {
            1: { 
                Width: 70,
                Height: 58,
                BaseResourceCost: [
                    { Resource: 1, Amount: 50}
                ]
            },
        },

        BaseCost: [
            { Tier: 1, Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1,
        Desc: "Trade Post Desc"
    },

    /*{
        Name: "Training Grounds",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 50 }
        ],
        RequiresMilestone: 1
    },*/
    
    /*{
        Name: "Ballista Tower",
        Size: 64,
        Cost: [
            { Resource: 1, Amount: 10 },
            { Resource: 2, Amount: 15 }
        ],
        RequiresMilestone: 1
    },*/
    
    /*{
        Name: "Inn",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1
    },*/
    
];

/*"Town Centre",
"Ballista Tower",
"Warehouse",
"Inn",
"Farm",
"Dwelling",
"Market",
"Goblin Outpost",
"Mine",
"Logging Camp",
"Wall",
"Gate",
"Academy",
"Alchemist",
"Blacksmith",
"Botanist",
"Fletchery",
"Adventurers Guild",
"Jeweller",
"Outfitter",
"Pasture",
"Sawmill",
"Siegeworks",
"Smelter",
"Tannery",
"Kitchen",
"Apothecary",
"Bank",
"Teleportarium*/

export default BuildingData;