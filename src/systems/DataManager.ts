import DefaultGameData from "../data/DefaultGameData";
import AllItemData from "../data/ItemData";
import AllCampaigns from "../data/Campaigns";
import { GD, CMD } from "../scenes/Game";

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
        return JSON.parse(localStorage.getItem(this.LocalStorageKey));
    }

    SaveLocalStorageData(Data: GameData): void {
        localStorage.setItem(this.LocalStorageKey, JSON.stringify(Data));
    }

    get ItemData(): { [key: string]: any } {
        return AllItemData;
    }

    GetItemData(id: string): any {
        return AllItemData[id] ?? null;
    }

    GetObjectData(id: number | string): any {
        return GD?.WorldData?.[GD?.CurrentMap]?.[id] ?? null;
    }

    get MapData(): { [key: string]: any } {
        return GD?.WorldData ?? {};
    }

    GetBuildingData(id: string): any {
        return CMD?.[id] ?? null;
    }

    get CampaignData(): Campaign[] {
        return AllCampaigns;
    }

    SaveGame(): void {
        const data = this.GetLocalStorageData();
        if (GD) {
            data.Characters[GD.Name] = GD;
        }
        this.SaveLocalStorageData(data);
    }

}

export default DataManager;