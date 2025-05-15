const Weapons: ItemData[] = [

    {
        ID: "staff_evoker_1",
        Name: "Novice Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with an elementary enchantment that fires a bolt of lightning towards the target, causing minor damage on hit.",
        Type: "Staff",
        Stackable: false
    },

];

Weapons.forEach((item) => {
    item.Category = "Weapon";
});

export default Weapons;