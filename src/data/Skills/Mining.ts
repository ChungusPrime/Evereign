const Mining: Skill = {
    Name: "Mining",
    Description: "Extract ores and minerals from the earth.",
    Levels: {
        1: {
            Unlock: false
        },
        2: {
            Unlock: "Pickaxe"
        },
        3: {
            Unlock: "Mining Helmet"
        },
        4: {
            Unlock: "Drill"
        },
        5: {
            Unlock: "Mining Cart"
        }
    }
}

export default Mining;