// ============================================================================
// World Data Utilities
// ============================================================================
// Handles the separation of static vs dynamic world data.
//
// STATIC DATA: Defined in Campaign WorldData, never saved to character.
//   Examples: Type, Name, Level, RequiresItem, QuestProgressID
//   Access via: DataManager.MapData[map][objectId]
//
// DYNAMIC DATA: Saved to character, can change during gameplay.
//   Examples: Alive, Health, Inventory, Loot, Active, Unlocked
//   Access via: GD.WorldData[map][objectId]
//
// When creating a character, only InitialData (dynamic) is copied to save data.
// When loading objects, static data is looked up from Campaign, dynamic from save.
// ============================================================================

/**
 * Extracts only the dynamic (InitialData) properties from campaign world data
 * to create the initial save state for a new character.
 * 
 * @param campaignWorldData The WorldData object from a Campaign
 * @returns A new object containing only the InitialData for each region/object
 */
export function extractInitialWorldData(campaignWorldData: { [region: string]: WorldData }): { [region: string]: { [objectId: string]: any } } {
    const characterWorldData: { [region: string]: { [objectId: string]: any } } = {};

    for (const region of Object.keys(campaignWorldData)) {
        characterWorldData[region] = {};
        
        for (const objectId of Object.keys(campaignWorldData[region])) {
            const objectDef = campaignWorldData[region][objectId];
            // Only copy InitialData - this is the dynamic state we want to save
            characterWorldData[region][objectId] = objectDef.InitialData ? { ...objectDef.InitialData } : {};
        }
    }

    return characterWorldData;
}

/**
 * Gets the full object data by merging static campaign data with dynamic save data.
 * Useful when you need both static and dynamic properties together.
 * 
 * @param staticData The static object definition from Campaign WorldData
 * @param dynamicData The saved dynamic state from Character WorldData
 * @returns Merged object with all properties
 */
export function getMergedObjectData(staticData: WorldData, dynamicData: any): any {
    return {
        ...staticData,
        ...dynamicData,
    };
}
