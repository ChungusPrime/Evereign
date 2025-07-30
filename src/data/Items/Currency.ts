const Currency: ItemData[] = [

    {
        ID: "gold",
        Name: "Gold Piece",
        Sprite: "bonus1-8",
        Desc: "A small coin made of gold, stamped with the image of a crown on one side and a sword on the other. Used as common currency through the kingdom.",
        Stackable: true,
        StackSize: 0,
        Sound: "Money"
    },
    
    {
        ID: "shard_valius",
        Name: "Shard of Valius",
        Sprite: "gems2-45",
        Desc: "A small fragment of Valius, a creation of the gods. It is said that Valius was shattered into a countless pieces, and that each piece contains a fraction of his power. Primarily used to upgrade traits and abilities.",
        Stackable: true,
        StackSize: 0
    },

    {
        ID: "ghs_scrip",
        Name: "GHS Scrip",
        Sprite: "gems2-45",
        Desc: "A token awarded by the GHS as a reward for completing tasks and quests. Can be exchanged for various rewards.",
        Stackable: true,
        StackSize: 0
    },

    {
        ID: "goblin_ear",
        Name: "Goblin Ear",
        Sprite: "gems2-45",
        Desc: "A trophy from a slain goblin.",
        Stackable: true,
        StackSize: 0
    },

];

Currency.forEach((item) => {
    item.Category = "Currency";
});

export default Currency;