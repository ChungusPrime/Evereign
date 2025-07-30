const Food: ItemData[] = [

    {
        ID: "oatcake",
        Name: "Willowvale Oatcake",
        Sprite: "food1-1",
        Desc: "A traditional oatcake from Willowvale, made with locally sourced oats and honey. A hearty snack perfect for long journeys.",
        Stackable: true,
        StackSize: 0,
    },

];

Food.forEach((item) => {
    item.Category = "Food";
});

export default Food;