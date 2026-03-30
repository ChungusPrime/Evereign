import DefaultGameData from "../data/DefaultGameData";

class DataManager {

    private LocalStorageKey: string = "EvereignData";

    constructor() {

        // Check if localStorage has data, if not create it
        const ExistingData: string | null = localStorage.getItem(this.LocalStorageKey);

        if ( !(ExistingData) ) {
            const Encoded = JSON.stringify(DefaultGameData);
            localStorage.setItem(this.LocalStorageKey, Encoded);
        }

    }

    GetLocalStorageData(): GameData {
        return JSON.parse(localStorage.getItem(this.LocalStorageKey) || '{}');
    }

    SaveLocalStorageData(Data: GameData): void {
        localStorage.setItem(this.LocalStorageKey, JSON.stringify(Data));
    }

}

export default DataManager;