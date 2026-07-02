const DeadWillowTree: ObjectData = {
    Name: "Dead Willow Tree",
    Description: "A withered willow tree, providing limited resources.",
    Category: "Trees",
    BaseHarvestAmount: 1,
    HarvestItem: "log_willow_dead",
    HarvestTime: 3000,
    HarvestSound: "woodcutting",
    HarvestRequiresToolType: "Felling Axe",
    HarvestExperienceType: "Forestry",
    HarvestExperienceValue: 5,
    ActivityLabel: "Cutting Dead Willow Tree",
    FloatMessage: "+1 Dead Willow Log",
    FloatSprite: "general",
    FloatFrame: 21,
    DepletesOnHarvest: true,
}

export default DeadWillowTree;