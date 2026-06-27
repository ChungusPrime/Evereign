import DefaultCharacterData from "../data/DefaultCharacter";
import Campaigns from "../data/Campaigns";
import ItemData from "../data/ItemData";
    
function CreateCharacter ( Name: string, Difficulty: string, Campaign: Campaign | null, Class: Class, Race: Race ) {

    try {

        // Create new character data
        this.scene.Data.Characters[Name] = { ...DefaultCharacterData };
        let Character = this.scene.Data.Characters[Name];

        Character.CreatedAtTimestamp = Date.now().toString();
        Character.LastSaveTimestamp = null;

        // Set character properties
        Character.Name = Name;
        Character.Class = Class.Name;
        Character.Race = Race.Name;
        
        Character.Difficulty = Difficulty;
        Character.NewGamePlus = 0;
        Character.Stats.Fortitude = Race.Attributes.Fortitude + Class.AttributeBonuses.Fortitude;
        Character.Stats.Versatility = Race.Attributes.Versatility + Class.AttributeBonuses.Versatility;
        Character.Stats.Vigor = Race.Attributes.Vigor + Class.AttributeBonuses.Vigor;
        Character.Stats.Expertise = Race.Attributes.Expertise + Class.AttributeBonuses.Expertise;
        Character.Stats.Personality = Race.Attributes.Personality + Class.AttributeBonuses.Personality;
        Character.Stats.Fortune = Race.Attributes.Fortune + Class.AttributeBonuses.Fortune;
        Character.Stats.Grit = Race.Attributes.Grit + Class.AttributeBonuses.Grit;
        Character.Stats.Arcana = Race.Attributes.Arcana + Class.AttributeBonuses.Arcana;
        Character.Stats.MovementSpeed = 80 + (Race.Attributes.Vigor * 5);
        Character.CurrentHealth = 20 + (Race.Attributes.Vigor * 5);
        Character.CurrentMana = 20 + (Race.Attributes.Arcana * 5);
        Character.Stats.MaxHealth = Character.CurrentHealth;
        Character.Stats.MaxMana = Character.CurrentMana;
        Character.Level = 1;
        Character.AttributePoints = 0;

        if ( Campaign !== null ) {
            Character.Campaign = Campaign.Name;
            Character.CurrentMap = Campaign.StartingMap;
            Character.X = Campaign.StartingX;
            Character.Y = Campaign.StartingY;
            const CampaignData = Campaigns.find( campaign => campaign.Name == Character.Campaign );
            // Copy only the dynamic InitialData to character save data
            // Static data (Type, Name, Level, etc.) stays in Campaign and is looked up at runtime
            Character.WorldData = {};
            for (const region of Object.keys(CampaignData.WorldData)) {
                Character.WorldData[region] = { DepletedHarvestables: [] };
                for (const objectId of Object.keys(CampaignData.WorldData[region])) {
                    const objectDef = CampaignData.WorldData[region][objectId];
                    if (objectId == "Information") continue;
                    Character.WorldData[region][objectId] = objectDef.InitialData ? { ...objectDef.InitialData } : {};
                }
            }
        }
        
        // Add starting items from chosen class to character inventory
        Object.entries(Class.Items).forEach( (item) => {
            if ( item[1] == null ) return;
            const [slot, info] = item;
            const Data = ItemData[info.ID];
            if ( !Data ) return console.warn(`CharacterCreation: item '${info.ID}' not found in ItemData`);
            Character.Inventory[slot] = { ...Data.InitialValue, Quantity: info.Quantity };
        });

        // Set up default hotbar for the character
        Object.entries(Class.Hotbar).forEach( (hotbar) => {
            const [slot, info] = hotbar;
            Character.Hotbar[slot] = info;
        });

        Class.Proficiencies.forEach( (proficiency) => Character.Proficiencies[proficiency] = { Level: 1, Experience: 0, NextLevelExperience: 100 } );

        // Add starting abilities from chosen class to character abilities
        Class.Abilities.forEach( (ability) => Character.Abilities.push({ ID: ability, Tier: 1, Cooldown: 0 }));

        // Add starting traits from chosen class to character traits
        Class.Traits.forEach( (trait) => Character.Traits.push({ ID: trait, Tier: 1 }));

        // Add racial traits to character traits
        Race.Traits.forEach( (trait) => Character.Traits.push({ ID: trait, Tier: 1 }));

        console.log(this.scene.Data);

        this.scene.DataManager.SaveLocalStorageData(this.scene.Data);
        this.scene.Data = this.scene.DataManager.GetLocalStorageData();

        console.log(this.scene.Data);

    } catch (error) {
        console.error("Error creating character: ", error);
        this.ErrorText.setText("An error occurred while creating the character. Please try again.").setVisible(true);
    }

}

export default CreateCharacter;