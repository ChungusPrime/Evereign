const Staffs: ItemData[] = [

    {
        ID: "staff_evoker_1",
        Name: "Novice Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with an elementary enchantment that fires a bolt of lightning towards the target, causing minor damage on hit.",
        Type: "Staff",
        Stackable: false
    },

    {
        ID: "staff_evoker_2",
        Name: "Apprentice Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with a basic enchantment that fires a bolt of lightning towards the target, causing moderate damage on hit.",
        Type: "Staff",
        Stackable: false
    },

    {
        ID: "staff_evoker_3",
        Name: "Journeyman Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with an advanced enchantment that fires a bolt of lightning towards the target, causing significant damage on hit.",
        Type: "Staff",
        Stackable: false
    },

    {
        ID: "staff_evoker_4",
        Name: "Master Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with a powerful enchantment that fires a bolt of lightning towards the target, causing massive damage on hit.",
        Type: "Staff",
        Stackable: false
    }


];

Staffs.forEach((item) => {
    item.Category = "Staff";
});

export default Staffs;