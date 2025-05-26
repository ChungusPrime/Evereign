const Ammunition: ItemData[] = [

    {
        ID: "lead_shot",
        Name: "Lead Shot",
        Sprite: "ammunition-1",
        Desc: "A handful of lead shot, used in shotguns.",
        Stackable: true,
        StackSize: 200,
        DamageModifier: 1
    },

];

Ammunition.forEach((item) => {
    item.Category = "Shot";
});

export default Ammunition;