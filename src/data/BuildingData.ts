const BuildingData: BuildingData[] = [
    
    {
        Name: "Town Centre",
        Size: 224,
        Cost: [
            { Resource: 1, Amount: 15 },
            { Resource: 2, Amount: 25 }
        ],
        RequiresMilestone: false
    },
    
    {
        Name: "Dwelling",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 50 }
        ],
        RequiresMilestone: 1
    },
    
    {
        Name: "Ballista Tower",
        Size: 64,
        Cost: [
            { Resource: 1, Amount: 10 },
            { Resource: 2, Amount: 15 }
        ],
        RequiresMilestone: 1
    },
    
    {
        Name: "Logging Camp",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1
    },
    
    {
        Name: "Warehouse",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1
    },
    
    {
        Name: "Mine",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1
    },
    
    {
        Name: "Farm",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1
    },
    
    {
        Name: "Inn",
        Size: 128,
        Cost: [
            { Resource: 1, Amount: 999 }
        ],
        RequiresMilestone: 1
    },
    
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
"Bank",*/

export default BuildingData;