import Game from "../scenes/Game";

// Game Data
import FlagData from '../data/FlagData';
import ClassData from '../data/ClassData';
import BuildingData from '../data/BuildingData';
import DialogueData from '../data/DialogueData';
import FirstNames from "../data/FirstNames";
import Lastnames from "../data/LastNames";
import DefaultSaveData from "../data/DefaultData";
import ItemData from "../data/ItemData";

// Map Data
import WillowvaleMapData from '../data/WillowvaleData';
import WillowvaleCavernsMapData from '../data/WillowvaleCavernsData';
import Item from "./Item";

export default class DataManager {

    private scene: Game;
    public BuildingData: BuildingData[] = BuildingData;
    public ClassData: ClassData = ClassData;
    public FlagData: GameFlags = FlagData;
    public DialogueData: any = DialogueData;
    public ItemData: ItemData[] = ItemData;
    public WillowvaleMapData: _Map = WillowvaleMapData;
    public WillowvaleCavernsMapData: _Map = WillowvaleCavernsMapData;
    public GameData: GameData = DefaultSaveData;

    constructor ( scene: Game ) {
        this.scene = scene;
        const savedData = localStorage.getItem(this.scene.CurrentSaveSlot);
        if (savedData) {
            Object.assign(this.GameData, JSON.parse(savedData));
        }
        this.CalculateTimeSinceLastSave();
    }

    public SaveGame () {

        let SaveData = this.GameData;
        SaveData.X = this.scene.PlayerCharacter.x;
        SaveData.Y = this.scene.PlayerCharacter.y;
        SaveData.DaytimeDelta = this.scene.DaytimeCycleManager.DaytimeDelta;
        SaveData.DaytimeHour = this.scene.DaytimeCycleManager.DaytimeHour;
        SaveData.DaytimeMinute = this.scene.DaytimeCycleManager.DaytimeMinute;
        SaveData.LastSaveTimestamp = Date.now().toString();
        SaveData.Inventory = [];
        this.scene.InventoryManager.Items.forEach( (item: Item) => {
            SaveData.Inventory.push({ ID: item.ItemID, Quantity: item.ItemQuantity });
        });

        SaveData.Maps[SaveData.CurrentMap].Buildings.forEach( (building) => {
            if ( building.Units !== undefined ) {
                building.Units.forEach( (unit) => {
                    unit.Alive = 0;
                });
            }
        });

        localStorage.setItem(this.scene.CurrentSaveSlot, JSON.stringify(this.GameData));
        this.scene.UI.EventLog.NewEvent(`Game saved`);
    }

    public CalculateTimeSinceLastSave () {
        let savedtime = parseInt(this.GameData.LastSaveTimestamp);
        let timenow = parseInt(Date.now().toString());
        let differenceInMilliseconds = timenow - savedtime;
        let differenceInSeconds = differenceInMilliseconds / 1000;
        console.log(`away for ${Math.round(differenceInSeconds)} seconds`);
    }

    public AddFlag ( ID: number ) {
        this.GameData.ProgressFlags.push(ID);
    }

    public GetClass ( ClassName: string ) {
        return this.ClassData[ClassName];
    }

    public GetItemData ( ID: number ) {
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
        if ( MapName == "Willowvale" ) {
            return this.WillowvaleMapData;
        } else if ( MapName == "Willowvale Caverns" ) {
            return this.WillowvaleCavernsMapData;
        }
        return false;
    }

    GetSkillData( Name: string ) {
        return this.GameData.Skills[Name];
    }

    public HasProgressFlag ( ID: number ): boolean {
        return this.GameData.ProgressFlags.includes(ID);
    }

    public GetBuildingData ( ID: number ) : any | null {
        let MapData = this.GetMapData(this.GameData.CurrentMap);
        if ( MapData == false || MapData == undefined ) return null;
        if ( MapData.Buildings == undefined ) return null;
        return MapData.Buildings.find( (e) => e.ID == ID ) ?? null;
    }

    public GetEnemyData ( ID: number ) : { ID: number; OnDestroyAddFlag: number; } | null {
        let MapData = this.GetMapData(this.GameData.CurrentMap);
        if ( MapData == false || MapData == undefined ) return null;
        if ( MapData.Enemies == undefined ) return null;
        return MapData.Enemies.find( (e) => e.ID == ID ) ?? null;
    }

    public GetObjectData ( ID: number ) : { ID: number; OnDestroyAddFlag: number; } | null {
        let MapData = this.GetMapData(this.GameData.CurrentMap);
        if ( MapData == false || MapData == undefined ) return null;
        if ( MapData.Objects == undefined ) return null;
        return MapData.Objects.find( (e) => e.ID == ID ) ?? null;
    }

    public GetBuildingUnits ( id: number ) {
        //let MapData = this.GameData.Maps[this.GameData.CurrentMap];
        //if ( MapData == undefined ) return null;
        //if ( MapData.Buildings == undefined ) return null;
        //let Building = MapData.Buildings.find( ( building ) => building.ID == id );
        //if ( Building == undefined || Building.Units ) return null;
        //return Building.Units;
        let res = this.GameData.Maps[this.GameData.CurrentMap].Buildings.find( ( building ) => building.ID == id ).Units;
        return res;
    }

    public GetRandomName () : string {
        let FirstName = FirstNames[Phaser.Math.Between(0, FirstNames.length - 1)];
        let LastName = Lastnames[Phaser.Math.Between(0, Lastnames.length - 1)];
        return `${FirstName} ${LastName}`;
    }

}