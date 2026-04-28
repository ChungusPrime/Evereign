const Consumables: ItemData[] = [

    {
        ID: "marigold_brew",
        Name: "Marigold Brew",
        Sprite: "potions-481",
        Desc: "A simple brew known for its light healing properties.",
        Stackable: true,
        StackSize: 5,
        InitialValue: { ID: "marigold_brew", Quantity: 1 },
        Craftable: true,
    },

    {
        ID: "bloomberry_decoction",
        Name: "Bloomberry Decoction",
        Sprite: "potions-482",
        Desc: "A decoction made from Bloomberries, known to restore mana.",
        Stackable: true,
        StackSize: 5,
        InitialValue: { ID: "bloomberry_decoction", Quantity: 1 },
        Craftable: true,
    },
    
    {
        ID: "apprentice_spellbook",
        Name: "Apprentince Mage's Spellbook",
        Sprite: "librarium-108",
        Desc: "The Spellbook of a slain Mage, containing notes on simple spells and incantations. Can be sold, or when used, grants 20 exp points.",
        Stackable: false,
        Craftable: false,
    },

    {
        ID: "town_centre_blueprint",
        Name: "Town Centre Blueprint",
        Sprite: "librarium-45",
        Desc: "Blueprints showing the design of a Town Centre. When used, grants the ability to construct town centres.",
        Stackable: false,
        InitialValue: { ID: "town_centre_blueprint", Quantity: 1 },
        Craftable: false,
    },

    {
        ID: "dwelling_blueprint",
        Name: "Dwelling Blueprint",
        Sprite: "librarium-45",
        Desc: "Blueprints showing the design of a Dwelling. When used, grants the ability to construct dwellings.",
        Stackable: false,
        InitialValue: { ID: "dwelling_blueprint", Quantity: 1 },
        Craftable: false,
    },

    {
        ID: "basic_town_kit",
        Name: "Basic Town Kit",
        Sprite: "librarium-45",
        Desc: "Contains several blueprints and the necessary materials to found a new town.",
        Stackable: false
    },

];

Consumables.forEach((item) => {
    item.Category = "Consumable";
});

export default Consumables;