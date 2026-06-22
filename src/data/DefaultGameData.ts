const DefaultGameData: GameData = {

    Controls: {
        Move_Up: 'w',
        Move_Down: 's',
        Move_Left: 'a',
        Move_Right: 'd',
        Interact: "Space",
        Weapon_Attack: "mouse-0",
        Use_Offhand: "mouse-2",
        Toggle_Light: "g",
        Use_Hotbar_1: "1",
        Use_Hotbar_2: "2",
        Use_Hotbar_3: "3",
        Use_Hotbar_4: "4",
        Use_Hotbar_5: "5",
        Use_Hotbar_6: "q",
        Use_Hotbar_7: "e",
        Use_Hotbar_8: "r",
        Use_Hotbar_9: "t",
        Use_Hotbar_10: "f",
    },

    Options: {
        "Aim Indicator": false,
        "Damage Numbers": true,
        "Health Bars": true,
    },

    LastCharacterPlayed: null,
    SoulGems: 0,
    CompletedCampaigns: [],
    ReincarnationTraits: [],
    Characters: {},
    Scenarios: {}
};

export default DefaultGameData;