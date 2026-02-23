const Fishing: Skill = {
    Name: "Fishing",
    Description: "Catch fish from various bodies of water.",
    Levels: {
        1: {
            Unlock: false
        },
        2: {
            Unlock: "Fishing Rod"
        },
        3: {
            Unlock: "Fishing Net"
        },
        4: {
            Unlock: "Fish Bait"
        },
        5: {
            Unlock: "Fishing Trap"
        }
    }
};

export default Fishing;