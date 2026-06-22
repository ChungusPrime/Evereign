const Blueprints: ItemData[] = [
    
    {
        ID: "town_centre_blueprint",
        Name: "Town Centre Blueprint",
        Sprite: "librarium-45",
        Desc: "Blueprints showing the design of a Town Centre. When used, grants the ability to construct town centres.",
        Stackable: false,
        InitialValue: { ID: "town_centre_blueprint", Quantity: 1 },
        Craftable: false,
        OnUse: { UnlockBuilding: "Town Centre" },
    },

    {
        ID: "dwelling_blueprint",
        Name: "Dwelling Blueprint",
        Sprite: "librarium-45",
        Desc: "Blueprints showing the design of a Dwelling. When used, grants the ability to construct dwellings.",
        Stackable: false,
        InitialValue: { ID: "dwelling_blueprint", Quantity: 1 },
        Craftable: false,
        OnUse: { UnlockBuilding: "Dwelling" },
    },

    {
        ID: "basic_town_kit",
        Name: "Basic Town Kit",
        Sprite: "librarium-45",
        Desc: "Contains several blueprints and the necessary materials to found a new town.",
        Stackable: false,
        InitialValue: { ID: "basic_town_kit", Quantity: 1 },
        Craftable: false,
    }

];

Blueprints.forEach((item) => {
    item.Category = "Blueprint";
});

export default Blueprints;