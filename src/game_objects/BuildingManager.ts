import Game from "../scenes/Game";
import UI from "../scenes/UI";

import Placeholder from "./placeholder";

import Inn from "./buildings/Inn";
import Farm from "./buildings/Farm";
import Building from "./Building";
import TownCentre from "./buildings/TownCentre";
import Warehouse from "./buildings/Warehouse";
import BallistaTower from "./buildings/BallistaTower";
import GoblinOutpost from "./buildings/GoblinOutpost";
import Dwelling from "./buildings/Dwelling";
import TradePost from "./buildings/TradePost";
import GoblinTower from "./buildings/GoblinTower";

export default class BuildingManager {

    public scene: Game;
    public UI: UI;
    public ValidPlacement: boolean = true;
    public BuildingPlacementMode: boolean = false;
    public Buildings: Phaser.GameObjects.Group;
    public Placeholder: Placeholder;

    constructor ( scene: Game, UI: UI ) {
        this.scene = scene;
        this.UI = UI;
        this.Placeholder = new Placeholder(scene);
        this.Buildings = this.scene.add.group([], { runChildUpdate: true, classType: Building });
    }

    DestroyBuilding ( Building: Building, Flag: number | null ) {

        Building.DESTROYING = true;

        if ( Building.AggroCollider !== undefined ) {
            Building.AggroCollider.body.destroy();
            Building.AggroCollider.destroy();
        }

        this.Buildings.remove(Building, true, true);

        if ( Flag !== null ) this.scene.DataManager.AddFlag(Flag);
        
        this.scene.MapManager.MapObjects.forEach( (obj: Phaser.GameObjects.Sprite) => {
            let ObjectNeedsFlag = obj.getData("Flag");
            if ( ObjectNeedsFlag == Flag ) {
                obj.destroy();
            }
        });

    }

    // This function will create a neutral building, based on map data. 
    // Buildings in map data are never owned by the player
    public CreateBuildingFromMapData ( scene: Game, type: string, x: number, y: number, id: number ) {

        if ( type == "Abandoned Mine" ) return;
        if ( type == "Goblin Stronghold" ) return;

        let Building = this.CreateBuilding(scene, type, x, y);

        if ( Building == null ) {
            return;
        }

        Building.SpawnDelta = 3000;
        Building.OnAlert = false;
        Building.ID = id;
        Building.setOrigin(0, 1);

        let BuildingData = this.scene.DataManager.GetBuildingData(id);

        if ( BuildingData !== null && BuildingData.hasOwnProperty("Level") ) {
            Building.setFrame(BuildingData.Level);
        }

        let DestroyFlag = null;

        if ( BuildingData !== null ) {
            Building.Data = BuildingData;
            DestroyFlag = BuildingData.OnDestroyAddFlag ?? null;
        }

        if ( type == "Goblin Outpost" || type == "Goblin Tower" ) {
            let Units = this.scene.DataManager.GetBuildingUnits(id);
            Building.Units = Units;
        }

        // If no destroy flag, always spawn it
        if ( DestroyFlag == null ) {
            this.Buildings.add(Building);
            return Building;
        }

        // Else, check to see if the Flag is not in the saved flags array
        if ( this.scene.DataManager.GameData.ProgressFlags.includes(DestroyFlag) ) {
            Building.destroy();
            return null;
        }

        this.Buildings.add(Building);
        return Building;

    }

    public CreateNewPlayerBuilding ( scene: Game, type: string, x: number, y: number ) {
        let Building = this.CreateBuilding(scene, type, x, y);
        if ( Building == null ) return;
        Building.SetPlayerOwned();

        if ( Building instanceof TownCentre ) {
            Building.CreateBuildZone();
            this.scene.TownCentre = Building;
        }

        let Map = this.scene.DataManager.GameData.CurrentMap;
        if ( this.scene.DataManager.GameData.PlayerTowns[Map] == undefined ) {
            this.scene.DataManager.GameData.PlayerTowns[Map] = {
                Name: "New Town",
                Buildings: [],
                StorageMax: 0,
                Storage: []
            };
        }
        this.scene.DataManager.GameData.PlayerTowns[Map].Buildings.push({
            type: type,
            x: x,
            y: y,
            area: this.scene.DataManager.GameData.CurrentMap,
            level: 1
        });
        this.Buildings.add(Building);
        return Building;
    }

    public CreateSavedPlayerBuilding ( scene: Game, type: string, x: number, y: number ) {
        let Building = this.CreateBuilding(scene, type, x, y);
        if ( Building == null ) return;
        Building.SetPlayerOwned();

        if ( Building instanceof TownCentre ) {
            Building.CreateBuildZone();
            this.scene.TownCentre = Building;
        }

        this.Buildings.add(Building);
        return Building;
    }

    private CreateBuilding ( scene: Game, type: string, x: number, y: number ) : Building | null {
        let ins = null;
        if ( type == "Town Centre" ) 
            ins = new TownCentre(scene, x, y);
        else if ( type == "Ballista Tower" ) 
            ins = new BallistaTower(scene, x, y);
        else if ( type == "Warehouse" ) 
            ins = new Warehouse(scene, x, y);
        else if ( type == "Inn" ) 
            ins = new Inn(scene, x, y);
        else if ( type == "Farm" ) 
            ins = new Farm(scene, x, y);
        else if ( type == "Dwelling" ) 
            ins = new Dwelling(scene, x, y);
        else if ( type == "Market" ) 
            ins = new TradePost(scene, x, y);
        else if ( type == "Goblin Outpost" ) 
            ins = new GoblinOutpost(scene, x, y);
        else if ( type == "Goblin Tower" ) 
            ins = new GoblinTower(scene, x, y);
        else 
            return null;
        return ins;
    }

    ActivateBuildingMode ( Building: string ) : void {
        this.scene.SelectedBuilding = Building;

        if ( this.scene.SelectedBuilding == "Town Centre" && this.scene.TownCentre !== null ) {
            this.DeactivateBuildingMode();
            this.UI.EventLog.NewEvent("You can only have one town centre per map");
        }

        this.Placeholder.setVisible(true);
        this.UI.BuidlingPlacementModeHelpText.setVisible(true);
        this.UI.BuildMenu.Hide();
        this.Placeholder.setActive(true);
        this.BuildingPlacementMode = true;
        if ( this.scene.TownCentre !== null && this.scene.TownCentre.BuildZone !== undefined ) {
            this.scene.TownCentre.BuildZone.setVisible(true);
        }
    }

    DeactivateBuildingMode () : void {
        this.scene.SelectedBuilding = "";
        this.Placeholder.setVisible(false);
        this.Placeholder.setActive(false);
        this.BuildingPlacementMode = false;
        this.UI.BuidlingPlacementModeHelpText.setVisible(false);
        this.UI.BuildMenu.Hide();
        this.Placeholder.setPosition(0, 0);
        this.scene.events.emit('Building-Mode-Deactivated');
        if ( this.scene.TownCentre !== null && this.scene.TownCentre.BuildZone !== undefined ) {
            this.scene.TownCentre.BuildZone.setVisible(false);
        }
    }

    CheckIfPlacementValid () {

        if ( this.BuildingPlacementMode == false ) return;
 
        // Get the size of the currently selected building
        let Size = this.scene.DataManager.BuildingData.find((b) => b.Name == this.scene.SelectedBuilding)?.Size ?? null;
        if ( Size == null ) return this.DeactivateBuildingMode();

        // Get the tile the mouse is currently hovered on
        const tile = this.scene.Map.worldToTileXY(this.scene.mouseX, this.scene.mouseY);

        // Get the x and y positions of this tile
        const world = this.scene.Map.tileToWorldXY(tile.x, tile.y);

        // Set the placeholder to this x and y
        this.Placeholder.setPosition(world.x, world.y);
        this.Placeholder.setPlaceholder(Size);

        let isContained = true;
        // Convert the game objects to Phaser.Geom.Rectangles
        if ( this.scene.SelectedBuilding != "Town Centre" ) {
            const boundsA = this.Placeholder.getBounds();
            const boundsB = this.scene.TownCentre.BuildZone.getBounds();
            // Check if rectA is fully contained within rectB
            isContained = Phaser.Geom.Rectangle.ContainsRect(boundsB, boundsA);
            if ( isContained == true ) {
                console.log("New building is within town centre build zone");
            } else {
                console.log("NOT IN BUILD ZONE");
            }
        }

        const tiles = this.scene.Map.getTilesWithinWorldXY( world.x, world.y, Size, Size, null, this.scene.cameras.main, "Collision" );
        const overlapping = tiles.find( (tile) => tile.index !== -1 );

        let overlapping_building = false;
        this.scene.physics.overlap(this.Placeholder, this.Buildings, (overlap) => {
            overlapping_building = true;
        }, null, this);

        if ( this.scene.SelectedBuilding == "Town Centre" ) {
            if ( overlapping == undefined && !overlapping_building ) {
                this.Placeholder.setFillStyle(0x44a617, 0.8);
                this.ValidPlacement = true;
            } else {
                this.Placeholder.setFillStyle(0xdb382c, 0.8);
                this.ValidPlacement = false;
            }
        } else {
            if ( overlapping == undefined && !overlapping_building && isContained ) {
                this.Placeholder.setFillStyle(0x44a617, 0.8);
                this.ValidPlacement = true;
            } else {
                this.Placeholder.setFillStyle(0xdb382c, 0.8);
                this.ValidPlacement = false;
            }
        }

    }

}