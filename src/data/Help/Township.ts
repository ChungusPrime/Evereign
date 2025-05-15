const TownshipHelp: DialogueData = {

    "TownshipHelp": {

        Subjects: {

            "Construction": {
                Text: `You can build various buildings in your township to help you gather resources and produce items.\n
                Each building has a specific function, such as gathering resources, producing items, or providing housing for workers.\n
                To build a building, you will need to gather the required resources and place it in a suitable location.\n
                Once built, you can interact with the building to manage its production and hire workers to help you.\n
                Constructing a building is instant, but upgrading them takes time.\n`,
            },

            "Building Types": {
                Text: `There are several types of buildings you can construct in your township, each with its own unique function.\n
                Some buildings are used for gathering resources, while others are used for producing items or providing housing for workers.\n
                You can view the available building types in the construction menu and select the one that best suits your needs.\n`,
            },

            "Storage": {
                Text: `You can store resources and items in your township by using storage buildings.\n
                Each storage building has a specific capacity, and you can upgrade it to increase its storage capacity.\n
                To store items, simply interact with the storage building and select the items you want to store.\n
                You can also view the items stored in the building and retrieve them when needed.\n
                Buildings that produce resources will automatically store the items in the storage building, so make sure to keep an eye on your storage capacity.\n
                Any buildings that have been assigned a job will automatically use resources stored in your Towns storage, and deposit any produced items there when finished
                Storage is shared across all buildings in a specific town.\n`,
            },

            "Producing Items": {
                Text: `You can produce various items in your township by using the buildings you have constructed.\n
                Each building has a specific production queue, and you can select the items you want to produce from the menu.\n
                Once you have selected the items, the building will start producing them automatically.\n
                You can view the production progress and the items that are currently being produced in the building's menu.\n
                Some items require specific resources to produce, so make sure to gather the required resources before starting production.\n`,
            },

            "Simulation": {
                Text: `When you aren't playing the game, your Town will continue to run in the background.\n
                This means that your buildings will continue to produce items, be upgraded, and your workers will continue to work.\n
                When you return to the game, you will be able to see the progress that has been made while you were away.\n
                Beware, when you are away for a long time, your Town may run out of resources and stop producing items, or your storage may fill up, halting production\n
                You may also be attacked by enemy forces while you are away, so make sure you build some defensive structures to guard your town while away.\n`,
            },

            "Town Centres": {
                Text: `You may found a new Town by building a Town Centre. This will allow you to starting producing various items to help you in your quest.\n
                When building a Town Centre, you will need to gather the required resources and place it in a suitable location.\n
                Once built, you can interact with the Town Centre to manage your township and access various features.\n
                Other buildings must be built in the vicinity of the Town Centre, and you may upgrade your Town Centre to increase the radius in which other buildings can be built.\n
                Only one Town Centre can be built per region, so choose wisely where to place it.\n`,
            },

            "Upgrading buildings": {
                Text: `You can upgrade your buildings to increase their production speed and the number of workers they can hold.\n
                Upgrading a building requires a specific amount of resources and time, and some buildings require a certain level of Town Centre to be upgraded.\n
                To upgrade a building, interact with it and select the upgrade option.\n
                Once the upgrade is complete, the building will have increased production speed and capacity.\n
                Upgrading buildings takes time, increasing with each tier of upgrade, the building may continue it's normal operations at its current tier while upgrading to the next.\n`,
            },

            "Hiring Workers": {
                Text: `You can hire workers from inns and taverns to work in your buildings.\n
                Each building has a specific number of workers it can hold, and hiring more workers will increase the building's production speed.\n
                To hire a worker, interact with an inn or tavern and select the hire option.\n
                Once hired, you can assign a worker to specific building. Workers have specialisations and can only work specific buildings, Farmers can work in Farms, Lumberjacks in Logging Camps or Sawmills etc.\n
                Some jobs require workers to be trained in specific skills, so make sure to check the requirements of a job for specifics.\n`,
            },

            "Farming": {
                Text: `Farming involves growing crops and raising animals in your township.\n
                You can build fields independently of farms and assign them to be used to grow specific crops and raise animals, and you can hire workers to help you manage them.\n
                Each farm can work a certain number of fields, regardless of what the field has been assigned to produce.\n
                The number of fields a farm can work is determined by the tier of the Farm.\n
                Products will be automatically stored in the Towns storage.\n
                Fields can be assigned the following:\n
                Arable (For growing crops)\n
                Pastures (For raising animals)\n
                Orchards (For growing trees)\n`,
            },

        }

    }

};

export default TownshipHelp;