const Consumables: ItemData[] = [

    {
        ID: "marigold_brew",
        Name: "Marigold Brew",
        Sprite: "potions-481",
        Desc: "A simple brew known for its light healing properties.",
        Stackable: true,
        StackSize: 5,
        InitialValue: { ID: "marigold_brew", Quantity: 1 }
    },
    
    {
        ID: "apprentice_spellbook",
        Name: "Apprentince Mage's Spellbook",
        Sprite: "librarium-108",
        Desc: "The Spellbook of a slain Mage, containing notes on simple spells and incantations. Can be sold, or when used, grants 20 exp points.",
        Stackable: false
    },

    {
        ID: "town_centre_blueprint",
        Name: "Town Centre Blueprint",
        Sprite: "librarium-45",
        Desc: "Blueprints showing the design of a Town Centre. When used, grants the ability to construct town centres.",
        Stackable: false
    },

];

Consumables.forEach((item) => {
    item.Category = "Consumable";
});

export default Consumables;