import Game from "../../scenes/Game";

import { Base64 } from 'js-base64';

import DisplayItemObject from "../DisplayItemObject";

// Static Data
import FlagData from '../../data/FlagData';
import ClassData from '../../data/ClassData';
import BuildingData from '../../data/BuildingData';
import DialogueData from '../../data/DialogueData';
import FirstNames from "../../data/FirstNames";
import Lastnames from "../../data/LastNames";
import ItemData from "../../data/ItemData";
import QuestData from "../../data/QuestData";
import StaticMapData from "../../data/StaticMapData";

// Dynamic Data
import GameData from "../../data/DefaultGameData";

export default class DataManager {

    private scene: Game;

    // These are all static data objects, they never change
    public CharacterData: GameData;
    public BuildingData: BuildingData[] = BuildingData;
    public ClassData: ClassData = ClassData;
    public FlagData: GameFlags = FlagData;
    public DialogueData: DialogueData = DialogueData;
    public ItemData: ItemData[] = ItemData;
    public QuestData: QuestData[] = QuestData;
    public MapData: {[key: string]: StaticMapData} = StaticMapData;

    // This is data used by the game as its running
    // A copy of this is saved to localstorage as the savegame
    public GameData: GameDataInterface = GameData;

    constructor ( scene: Game ) {
        this.scene = scene;

        let SavedData = JSON.parse(localStorage.getItem("EvereignData"));
        console.log(SavedData);

        // Get character data from local storage
        this.CharacterData = SavedData.Characters[this.scene.CharacterName];
        console.log(this.CharacterData);
    }

    public SaveGame () {

        let SaveData = this.CharacterData;
        SaveData.X = this.scene.PlayerCharacter.x;
        SaveData.Y = this.scene.PlayerCharacter.y;
        SaveData.DaytimeDelta = this.scene.DaytimeCycleManager.DaytimeDelta;
        SaveData.DaytimeHour = this.scene.DaytimeCycleManager.DaytimeHour;
        SaveData.DaytimeMinute = this.scene.DaytimeCycleManager.DaytimeMinute;
        SaveData.LastSaveTimestamp = Date.now().toString();
        SaveData.Inventory = {};
        SaveData.CurrentHealth = this.scene.PlayerCharacter.Health;
        SaveData.CurrentMana = this.scene.PlayerCharacter.Mana;
        //this.scene.Inventory.Items.forEach( (item: DisplayItemObject) => {
            //SaveData.Inventory.push({ ID: item.getData('ItemID'), Quantity: item.getData('ItemQuantity') });
        //});
        SaveData.Maps[SaveData.CurrentMap].Buildings.forEach( (building) => {
            if ( building.Units !== undefined ) {
                building.Units.forEach( (unit) => { unit.Alive = 0 });
            }
        });

        console.log(SaveData);

        let SavedData = JSON.parse(localStorage.getItem("EvereignData"));

        // Get character data from local storage
        SavedData.Characters[this.scene.CharacterName] = SaveData;

        // Save the data to local storage
        localStorage.setItem("EvereignData", JSON.stringify(SavedData));
      
        
        this.scene.UI.EventLog.NewEvent(`Game saved`);
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
        return this.ClassData[ClassName];
    }

    public GetItemData ( ID: string ) {
        return this.ItemData.find((data: ItemData) => data.ID == ID )
    }

    public GetAbility ( ClassName: string, Ability: string ) {
        let ClassData = this.ClassData[ClassName].abilities;
        if ( ClassData == undefined ) {
            console.error(`Ability ${Ability} not found in class ${ClassName}`);
            return;
        } else {
            return ClassData[Ability];
        }
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
        return this.CharacterData.Maps[this.CharacterData.CurrentMap].Objects.find( (e) => e.ID == ID ).Loot ?? null;
    }

    public GetBuildingData ( ID: number ) : StaticBuildingData | null {
        let MapData = this.GetMapData(this.CharacterData.CurrentMap);
        return MapData.Buildings.find( (e) => e.ID == ID ) ?? null;
    }

    public GetEnemyData ( ID: number ) : { ID: number; OnDestroyAddFlag: number; } | null {
        let MapData = this.GetMapData(this.CharacterData.CurrentMap);
        return MapData.Enemies.find( (e) => e.ID == ID ) ?? null;
    }

    public GetObjectData ( ID: number ): IObject {
        let res = this.CharacterData.Maps[this.CharacterData.CurrentMap].Objects.find( ( object ) => object.ID == ID );
        return res;
    }

    public GetBuildingUnits ( id: number ) {
        let res = this.CharacterData.Maps[this.CharacterData.CurrentMap].Buildings.find( ( building ) => building.ID == id ).Units;
        return res;
    }

    public GetRandomName () : string {
        let FirstName = FirstNames[Phaser.Math.Between(0, FirstNames.length - 1)];
        let LastName = Lastnames[Phaser.Math.Between(0, Lastnames.length - 1)];
        return `${FirstName} ${LastName}`;
    }

}