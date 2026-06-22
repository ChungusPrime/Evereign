const Consumables: ItemData[] = [

    {
        ID: "apprentice_spellbook",
        Name: "Apprentince Mage's Spellbook",
        Sprite: "librarium-108",
        Desc: "The Spellbook of a slain Mage, containing notes on simple spells and incantations. Can be sold, or when used, grants 20 exp points.",
        Stackable: false,
        Craftable: false,
        OnUse: { GiveXP: 20 },
    },

];

Consumables.forEach((item) => {
    item.Category = "Consumable";
});

export default Consumables;