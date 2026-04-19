import Races from "./Races";
import Classes from "./Classes";
import Campaigns from "./Campaigns";
import Proficiencies from "./Proficiencies";
import Difficulties from "./Difficulties";

const Help: HelpText = {

    // Difficulties
    Story: Difficulties.Story.Description,
    Standard: Difficulties.Standard.Description,
    Ultra: Difficulties.ULTRA.Description,

    // Campaigns
    "The Midnight Accord": Campaigns[0].Description,
    //"The Defence of Emberfall Island": Campaigns[1].Description,

    // Classes
    Agent: Classes.Agent.Description,
    Evoker: Classes.Evoker.Description,
    Godsworn: Classes.Godsworn.Description,

    // Races
    Human: Races.Human.Description,
    Elf: Races.Elf.Description,
    Dwarf: Races.Dwarf.Description,
    Protostruct: Races.Protostruct.Description,
    Morvenite: Races.Morvenite.Description,
    Gnome: Races.Gnome.Description,
    Kirupean: Races.Kirupean.Description,
    Thogac: Races.Thogac.Description,
    Tiseri: Races.Tiseri.Description,
    Drakonid: Races.Drakonid.Description,

    // Proficiencies
    Scatterguns: Proficiencies.Scatterguns.Description,
    Crossbows: Proficiencies.Crossbows.Description,
    Swords: Proficiencies.Swords.Description,
    Hammers: Proficiencies.Hammers.Description,

    Race: `Your character's Race determines their starting attributes. All Races grant at least one unique trait to your character
    and can affect your gameplay experience.\n
    Each race starts with different base attribute values, and each races attributes increase at different rates per level up.\n`,

    Class: `Your character's Class provides some starting some starting equipment, as well as provide a small boost to specific attributes.
    Each class comes with a set of starting proficiencies, though these are not restrictions, as your character can learn any proficiency, ability or trait and swap them around freely,
    classes simply provide a template for a specific character archetype.
    `,

    Attributes: `Attributes are the core stats of your character, determining their abilities and effectiveness in combat.
    In addition to the attribute increases provided by your character's race on level up, you will recieve a number of attribute points that you can freely spend to increase your character's attributes.
    Each attribute has a specific effect on your character's performance, such as increasing damage dealt, reducing damage taken, or improving healing.
    Attributes can be increased by leveling up, acquiring traits, or using abilities.
    The attributes are:
    - Fortitude: Increases damage dealt with melee weapons and increases carrying capacity.
    - Versatility: Increases accuracy with ranged weapons and reduces damage taken from ranged attacks.
    - Vigor: Increases maximum health and reduces damage taken from all sources.
    - Expertise: Increases the effectiveness of abilities and reduces cooldown times.
    - Arcana: Increases the effectiveness of magical abilities and reduces mana costs.
    - Personality: Increases the effectiveness of healing and support abilities, as well as improving interactions with NPCs.
    - Fortune: Increases the chance of critical hits and reduces the chance of negative effects.
    - Grit: Increases resistance to negative effects and improves the effectiveness of certain abilities.
    `,

    Abilities: `Abilities are special skills that your character can use to perform various actions in the game.\n
    All abilities are Active, meaning they must be used manually by the player.\n
    They can be used to attack enemies, heal allies, or perform other actions.\n
    They are unlocked as you progress through the game, and can be upgraded to increase their effectiveness.\n
    Abilities must be assigned to your hotbar before they can be used.\n
    Each ability has a specific cooldown time, and requires certain traits to be able to use.\n
    `,

    Traits: `Traits are special bonuses that your character can gain as they progress through the game.\n
    They can be used to increase your character's stats, unlock new abilities, or provide other benefits.\n
    Traits are unlocked as you progress through the game, and can be upgraded to increase their effectiveness.\n
    Traits are Passive, meaning they are always active and do not require any action from the player.\n
    `,

    Movement: `You can move around your township by using the WASD keys (default) on your keyboard.\n
    Movement controls can be freely rebound in the settings menu.\n
    Your movement speed is determined by your character's Agility attribute, and can be modified by
    your worn equipment, as well as status effects, traits, abilities, or even random events.\n
    `,

    Gadgetry: `Though magic is commonplace in the world, not all mortals are able to harness its power. As such, many have turned to technology as a means of achieving their goals. 
    Known as Gadgets, the fusion of magic and science, allows mortals to harness the power of magic to power machines and constructions.\n
    `,

    "The Gods": `The Gods are the ancient beings that created the world and its inhabitants. They are powerful and wise, and their influence can be felt throughout the land.\n
    Each god has their own unique abilities and traits, and they can be worshipped by mortals to gain their favor.\n
    The gods are not directly involved in the affairs of mortals, but they can be called upon for aid in times of need.\n
    `,

    "The Underlords": `The Underlords are the ancient beings that were sealed away by the gods after the Shattering of Valius.\n
    They are powerful and malevolent, and their influence can be felt throughout the land.\n
    `,

    Research: `Research is a key aspect of the game, allowing you to unlock new abilities, traits, and technologies.\n
    You can research new technologies by gathering resources and spending time in your township.\n
    Research can be used to improve your character's abilities, unlock new traits, and gain access to new technologies.\n
    Research is done in the Academy, which can be built in your township.\n
    Researching new technologies requires a specific amount of resources and time, and some technologies require a certain level of Academy to be researched.\n
    To research a technology, interact with the Academy and select the research option.\n
    `,

    Construction: `You can build various buildings in your township to help you gather resources and produce items.\n
    Each building has a specific function, such as gathering resources, producing items, or providing housing for workers.\n
    To build a building, you will need to gather the required resources and place it in a suitable location.\n
    Once built, you can interact with the building to manage its production and hire workers to help you.\n
    Constructing a building is instant, but upgrading them takes time.`,

    "Building Types": `There are several types of buildings you can construct in your township, each with its own unique function.\n
    Some buildings are used for gathering resources, while others are used for producing items or providing housing for workers.\n
    You can view the available building types in the construction menu and select the one that best suits your needs.`,

    Events: `Events are random occurrences that can happen in your township, such as enemy attacks or natural disasters.\n
    These events can have a significant impact on your township, so it's important to be prepared for them.\n
    You can view the current events in the events menu and take action to mitigate their effects.\n
    Some events may require you to gather specific resources or build certain buildings to overcome them.`,

    Defence:
    `Defensive structures are buildings that can be used to protect your township from enemy attacks.\n
    These structures can be built in strategic locations to provide cover for your workers and resources.\n
    You can view the available defensive structures in the construction menu and select the one that best suits your needs.\n
    Some defensive structures require specific resources to build, so make sure to gather the required resources before starting construction.\n
    When these structures kill an enemy unit, they will gain XP, which is added to a bank. You can choose to spend this XP upgrading the structure,
    or, you can absorb the XP and add it to your own characters XP bar.`,

    Storage: 
    `You can store resources and items in your township by using storage buildings.\n
    Each storage building has a specific capacity, and you can upgrade it to increase its storage capacity.\n
    To store items, simply interact with the storage building and select the items you want to store.\n
    You can also view the items stored in the building and retrieve them when needed.\n
    Buildings that produce resources will automatically store the items in the storage building, so make sure to keep an eye on your storage capacity.\n
    Any buildings that have been assigned a job will automatically use resources stored in your Towns storage, and deposit any produced items there when finished
    Storage is shared across all buildings in a specific town.`,

    Production:
    `You can produce various items in your township by using the buildings you have constructed.\n
    Each building has a specific production queue, and you can select the items you want to produce from the menu.\n
    Once you have selected the items, the building will start producing them automatically.\n
    You can view the production progress and the items that are currently being produced in the building's menu.\n
    Some items require specific resources to produce, so make sure to gather the required resources before starting production.`,

    Simulation:
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

    Farming:
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