interface HelpText {
    [section: string]: string;
}

const Help: HelpText = {

    "Character Race": `
    Your character's Race determines their starting attributes. All Races grant at least one unique trait to your character
    and can affect your gameplay experience.\n
    Each race starts with different attribute values, and you can freely choose which of these attributes to increase on level up, 
    allowing you to learn new abilities and traits.\n`,

    "Character Class": `
    Your character's Class provides some starting abilities and traits, as well as provide a small boost to specific attributes.\n
    A characters class does not determine their playstyle, as any character learn any ability or trait in the game, they simply provide a template for a specific archetype.\n
    However, each class has a unique building that can be constructed in your township, providing a unique benefit.\n
    `,

    "Abilities": `
    Abilities are special skills that your character can use to perform various actions in the game.\n
    All abilities are Active, meaning they must be used manually by the player.\n
    They can be used to attack enemies, heal allies, or perform other actions.\n
    They are unlocked as you progress through the game, and can be upgraded to increase their effectiveness.\n
    Abilities must be assigned to your hotbar before they can be used.\n
    Each ability has a specific cooldown time, and requires certain traits to be able to use.\n
    `,

    "Traits": `
    Traits are special bonuses that your character can gain as they progress through the game.\n
    They can be used to increase your character's stats, unlock new abilities, or provide other benefits.\n
    Traits are unlocked as you progress through the game, and can be upgraded to increase their effectiveness.\n
    Traits are Passive, meaning they are always active and do not require any action from the player.\n
    `,

    "Movement": `
    You can move around your township by using the WASD keys (default) on your keyboard.\n
    Movement controls can be freely rebound in the settings menu.\n
    Your movement speed is determined by your character's Agility attribute, and can be modified by
    your worn equipment, as well as status effects, traits, abilities, or even random events.\n
    `,

    "Construction": 
    `You can build various buildings in your township to help you gather resources and produce items.\n
    Each building has a specific function, such as gathering resources, producing items, or providing housing for workers.\n
    To build a building, you will need to gather the required resources and place it in a suitable location.\n
    Once built, you can interact with the building to manage its production and hire workers to help you.\n
    Constructing a building is instant, but upgrading them takes time.`,

    "Building Types":
    `There are several types of buildings you can construct in your township, each with its own unique function.\n
    Some buildings are used for gathering resources, while others are used for producing items or providing housing for workers.\n
    You can view the available building types in the construction menu and select the one that best suits your needs.`,

    "Events":
    `Events are random occurrences that can happen in your township, such as enemy attacks or natural disasters.\n
    These events can have a significant impact on your township, so it's important to be prepared for them.\n
    You can view the current events in the events menu and take action to mitigate their effects.\n
    Some events may require you to gather specific resources or build certain buildings to overcome them.`,

    "Defensive Structures":
    `Defensive structures are buildings that can be used to protect your township from enemy attacks.\n
    These structures can be built in strategic locations to provide cover for your workers and resources.\n
    You can view the available defensive structures in the construction menu and select the one that best suits your needs.\n
    Some defensive structures require specific resources to build, so make sure to gather the required resources before starting construction.\n
    When these structures kill an enemy unit, they will gain XP, which is added to a bank. You can choose to spend this XP upgrading the structure,
    or, you can absorb the XP and add it to your own characters XP bar.`,

    "Storage": 
    `You can store resources and items in your township by using storage buildings.\n
    Each storage building has a specific capacity, and you can upgrade it to increase its storage capacity.\n
    To store items, simply interact with the storage building and select the items you want to store.\n
    You can also view the items stored in the building and retrieve them when needed.\n
    Buildings that produce resources will automatically store the items in the storage building, so make sure to keep an eye on your storage capacity.\n
    Any buildings that have been assigned a job will automatically use resources stored in your Towns storage, and deposit any produced items there when finished
    Storage is shared across all buildings in a specific town.`,

    "Producing Items":
    `You can produce various items in your township by using the buildings you have constructed.\n
    Each building has a specific production queue, and you can select the items you want to produce from the menu.\n
    Once you have selected the items, the building will start producing them automatically.\n
    You can view the production progress and the items that are currently being produced in the building's menu.\n
    Some items require specific resources to produce, so make sure to gather the required resources before starting production.`,

    "Simulation":
    `When you aren't playing the game, your Town will continue to run in the background.\n
    This means that your buildings will continue to produce items, be upgraded, and your workers will continue to work.\n
    When you return to the game, you will be able to see the progress that has been made while you were away.\n
    Beware, when you are away for a long time, your Town may run out of resources and stop producing items, or your storage may fill up, halting production\n
    You may also be attacked by enemy forces while you are away, so make sure you build some defensive structures to guard your town while away.`,

    "Town Centres":
    `You may found a new Town by building a Town Centre. This will allow you to starting producing various items to help you in your quest.\n
    When building a Town Centre, you will need to gather the required resources and place it in a suitable location.\n
    Once built, you can interact with the Town Centre to manage your township and access various features.\n
    Other buildings must be built in the vicinity of the Town Centre, and you may upgrade your Town Centre to increase the radius in which other buildings can be built.\n
    Only one Town Centre can be built per region, so choose wisely where to place it.`,

    "Upgrading buildings":
    `You can upgrade your buildings to increase their production speed and the number of workers they can hold.\n
    Upgrading a building requires a specific amount of resources and time, and some buildings require a certain level of Town Centre to be upgraded.\n
    To upgrade a building, interact with it and select the upgrade option.\n
    Once the upgrade is complete, the building will have increased production speed and capacity.\n
    Upgrading buildings takes time, increasing with each tier of upgrade, the building may continue it's normal operations at its current tier while upgrading to the next.`,

    "Hiring Workers":
    `You can hire workers from inns and taverns to work in your buildings.\n
    Each building has a specific number of workers it can hold, and hiring more workers will increase the building's production speed.\n
    To hire a worker, interact with an inn or tavern and select the hire option.\n
    Once hired, you can assign a worker to specific building. Workers have specialisations and can only work specific buildings, Farmers can work in Farms, Lumberjacks in Logging Camps or Sawmills etc.\n
    Some jobs require workers to be trained in specific skills, so make sure to check the requirements of a job for specifics.`,

    "Farming":
    `Farming involves growing crops and raising animals in your township.\n
    You can build fields independently of farms and assign them to be used to grow specific crops and raise animals, and you can hire workers to help you manage them.\n
    Each farm can work a certain number of fields, regardless of what the field has been assigned to produce.\n
    The number of fields a farm can work is determined by the tier of the Farm.\n
    Products will be automatically stored in the Towns storage.\n
    Fields can be assigned the following:\n
    Arable (For growing crops)\n
    Pastures (For raising animals)\n
    Orchards (For growing trees)`,

}

export default Help;