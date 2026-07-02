const WillowTree: ObjectData = {
    Name: "Willow Tree",
    Description: "A sturdy willow tree, providing shade and resources.",
    Category: "Trees",
    BaseHarvestAmount: 1,
    HarvestItem: "log_willow",
    HarvestTime: 3000,
    HarvestSound: "woodcutting",
    HarvestRequiresToolType: "Felling Axe",
    HarvestExperienceType: "Forestry",
    HarvestExperienceValue: 5,
    ActivityLabel: "Cutting Willow Tree",
    FloatMessage: "+1 Willow Log",
    FloatSprite: "general",
    FloatFrame: 21,
    DepletesOnHarvest: true,
    BodySize: { width: 30, height: 60 },
    BodyOffset: { x: 80, y: 120 },
}

export default WillowTree;