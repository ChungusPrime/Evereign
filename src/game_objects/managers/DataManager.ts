import Game, { GD } from "../../scenes/Game";

import { Base64 } from 'js-base64';

// Static Data
import FlagData from '../../data/FlagData';
import ClassData from '../../data/Character/Classes';
import BuildingData from '../../data/BuildingData';
import FirstNames from "../../data/Character/FirstNames";
import Lastnames from "../../data/Character/LastNames";
import ItemData from "../../data/ItemData";
import QuestData from "../../data/QuestData";
import CampaignData from "../../data/Campaigns";

// Dynamic Data
import GameData from "../../data/DefaultGameData";

export default class DataManager {

    private scene: Game;

    // These are all static data objects, they never change
    public CharacterData: Character;
    public BuildingData: BuildingData;
    //public ClassData: ClassData = ClassData;
    public FlagData: GameFlags = FlagData;
    public ItemData = ItemData;
    public QuestData: QuestData;
    public CampaignData: Campaign[] = CampaignData;
    public MapData: {[key: string]: WorldData}; // This will be set when the map is loaded

    // This is data used by the game as its running
    // A copy of this is saved to localstorage as the savegame
    public GameData: GameData = GameData;

    constructor ( scene: Game ) {
        this.scene = scene;
        let SavedData = JSON.parse(localStorage.getItem("EvereignData"));
        this.CharacterData = SavedData.Characters[this.scene.CharacterName];
        this.MapData = CampaignData.find( (campaign) => campaign.ID == this.CharacterData.Campaign ).WorldData;
        console.log(this.CalculateTimeSinceLastSave());
    }

    public SaveGame () {
        GD.X = this.scene.PlayerCharacter.x;
        GD.Y = this.scene.PlayerCharacter.y;
        GD.DaytimeDelta = this.scene.DaytimeCycleManager.DaytimeDelta;
        GD.DaytimeHour = this.scene.DaytimeCycleManager.DaytimeHour;
        GD.DaytimeMinute = this.scene.DaytimeCycleManager.DaytimeMinute;
        GD.LastSaveTimestamp = Date.now().toString();
        let SavedData = JSON.parse(localStorage.getItem("EvereignData"));
        SavedData.Characters[this.scene.CharacterName] = GD;
        localStorage.setItem("EvereignData", JSON.stringify(SavedData));
        this.scene.UI.EventLog.NewEvent(`Game saved! ${GD.LastSaveTimestamp}`);
    }

    public CalculateTimeSinceLastSave () {
        let savedtime = parseInt(this.CharacterData.LastSaveTimestamp);
        let timenow = parseInt(Date.now().toString());
        let differenceInMilliseconds = timenow - savedtime;
        let differenceInSeconds = differenceInMilliseconds / 1000;
        console.log(`away for ${Math.round(differenceInSeconds)} seconds`);
    }

    public AddFlag ( ID: number ) {
        this.CharacterData.ProgressFlags.push(ID);
    }

    public GetClass ( ClassName: string ) {
        //return this.ClassData[ClassName];
    }

    public GetItemData ( ID: string ) {
        return ItemData[ID];
    }

    public GetAbility ( ClassName: string, Ability: string ) {
        /*let ClassData = this.ClassData[ClassName].abilities;
        if ( ClassData == undefined ) {
            console.error(`Ability ${Ability} not found in class ${ClassName}`);
            return;
        } else {
            return ClassData[Ability];
        }*/
    }

    public GetMapData ( MapName: string ) {
        return this.MapData[MapName];
    }

    public GetSkillData( Name: string ) {
        return this.CharacterData.Skills[Name];
    }

    public HasProgressFlag ( ID: number ): boolean {
        return this.CharacterData.ProgressFlags.includes(ID);
    }

    public GetChestLoot ( ID: number ) : LootItem[] | null {
        return this.CharacterData.WorldData[this.CharacterData.CurrentMap][ID].Loot ?? null;
    }

    public GetBuildingData ( ID: string ) : StaticBuildingData | null {
        let MapData = this.GetMapData(this.CharacterData.CurrentMap);
        const obj = MapData[ID];
        if (obj && typeof obj.ID !== "undefined") {
            return obj as StaticBuildingData;
        }
        return null;
    }

    public GetEnemyData ( ID: number ) : { ID: number; OnDestroyAddFlag?: number; } | null {
        let MapData = this.GetMapData(this.CharacterData.CurrentMap);
        const obj = MapData[ID];
        if (obj && typeof obj.ID === "number") {
            return obj as { ID: number; OnDestroyAddFlag?: number; };
        }
        return null;
    }

    public GetObjectData ( ID: number ): any {
        let res = this.CharacterData.WorldData[this.CharacterData.CurrentMap][ID];
        return res;
    }

    public GetBuildingUnits ( id: number ) {
        let res = this.CharacterData.WorldData[this.CharacterData.CurrentMap][id].Units;
        return res;
    }

    public GetRandomName () : string {
        let FirstName = FirstNames[Phaser.Math.Between(0, FirstNames.length - 1)];
        let LastName = Lastnames[Phaser.Math.Between(0, Lastnames.length - 1)];
        return `${FirstName} ${LastName}`;
    }

}