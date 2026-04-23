const QuestItems: ItemData[] = [

    {
        ID: "draxian_venom",
        Name: "Phial of Draxian Venom",
        Sprite: "general-21",
        Desc: "A phial containing the dangerously potent concoction known as Draxian Venom. It has a particularly pronounced effect on mutated and blighted plant life.",
        Stackable: false,
        InitialValue: { ID: "draxian_venom", Quantity: 1 }
    },

    {
        ID: "draxus_folly_seed",
        Name: "Draxus' Folly Seed",
        Sprite: "general-22",
        Desc: "A rare seed extracted from the flower known as Draxius Folliculus (or Draxus' Folly in the common tongue).",
        Stackable: true,
        StackSize: 3,
        InitialValue: { ID: "draxus_folly_seed", Quantity: 1 }
    },

];

QuestItems.forEach((item) => {
    item.Category = "Quest";
});

export default QuestItems;