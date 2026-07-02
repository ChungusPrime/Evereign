const IronNode: ObjectData = {
    Name: "Iron Node",
    Description: "A vein of iron ore embedded in the rock. A versatile metal used in many crafting recipes.",
    Category: "Nodes",
    BaseHarvestAmount: 1,
    HarvestItem: "ore_iron",
    HarvestTime: 5000,
    HarvestSound: "mining",
    HarvestRequiresToolType: "Pickaxe",
    HarvestExperienceType: "Mining",
    HarvestExperienceValue: 5,
    ActivityLabel: "Mining Iron",
    FloatMessage: "+1 Iron Ore",
    FloatSprite: "mining-nodes",
    FloatFrame: 1,
    DepletesOnHarvest: false,
};

export default IronNode;
