const StoneNode: ObjectData = {
    Name: "Stone Node",
    Description: "A rocky outcrop containing rough stone. A basic but essential construction material.",
    Category: "Nodes",
    BaseHarvestAmount: 1,
    HarvestItem: "stone_rough",
    HarvestTime: 4000,
    HarvestSound: "mining",
    HarvestRequiresToolType: "Pickaxe",
    HarvestExperienceType: "Mining",
    HarvestExperienceValue: 5,
    ActivityLabel: "Mining Stone",
    FloatMessage: "+1 Stone",
    FloatSprite: "general",
    FloatFrame: 60,
    DepletesOnHarvest: false,
};

export default StoneNode;
