import Inn from "../game_objects/buildings/Inn";
import Farm from "../game_objects/buildings/Farm";
import Building from "../game_objects/Building";
import TownCentre from "../game_objects/buildings/TownCentre";
import Warehouse from "../game_objects/buildings/Warehouse";
import BallistaTower from "../game_objects/buildings/BallistaTower";
import GoblinOutpost from "../game_objects/buildings/GoblinOutpost";
import Dwelling from "../game_objects/buildings/Dwelling";
import Market from "../game_objects/buildings/Market";
import GoblinTower from "../game_objects/buildings/GoblinTower";
import Game from "../scenes/Game";
import UI from "../scenes/UI";
import Placeholder from "../game_objects/placeholder";
import { GD } from "../scenes/Game";

export default class BuildMode {

    public scene: Game;
    public UI: UI;
    public ValidPlacement: boolean = true;
    public BuildingPlacementMode: boolean = false;
    public Placeholder: Placeholder;

    constructor ( scene: Game, UI: UI ) {
        this.scene = scene;
        this.UI = UI;
        this.Placeholder = new Placeholder(scene);
    }

    private CreateBuilding(scene: Game, type: string, x: number, y: number): Building | null {

        // Mapping of building types to their respective classes
        const buildingClasses: { [key: string]: any } = {
            "Town Centre": TownCentre,
            "Ballista Tower": BallistaTower,
            "Warehouse": Warehouse,
            "Inn": Inn,
            "Farm": Farm,
            "Dwelling": Dwelling,
            "Market": Market,
            "Goblin Outpost": GoblinOutpost,
            "Goblin Tower": GoblinTower
        };
    
        // Check if the type is valid and create an instance of the appropriate class
        const BuildingClass = buildingClasses[type];
        if (BuildingClass) {
            return new BuildingClass(scene, x, y);
        }
    
        // Return null if the type is not valid
        return null;
    }

    public CreateBuildingFromMapData ( scene: Game, type: string, x: number, y: number, id: string ) {

        if ( type == "Abandoned Mine" ) return;
        if ( type == "Goblin Stronghold" ) return;

        const StaticBuildingData = this.scene.DataManager.GetBuildingData(id);

        const SavedBuildingData = GD.WorldData[GD.CurrentMap][id];
        if ( SavedBuildingData !== undefined && SavedBuildingData.Destroyed == true ) return;

        let Building = this.CreateBuilding(scene, type, x, y);
        if ( Building == null ) return;

        if ( StaticBuildingData != null ) {
            Building.ID = StaticBuildingData.ID;
            Building.StaticData = StaticBuildingData;
            if ( StaticBuildingData.hasOwnProperty("Level") ) {
                //let CurrentFrame = Building.frame.name.slice(0, -1);
                //Building.setFrame(CurrentFrame + StaticBuildingData.Level, false, false);
            }
        }

        const VariableBuildingData = GD.WorldData[GD.CurrentMap][id];
        if ( VariableBuildingData != null ) {
            Building.VariableData = VariableBuildingData;
            Building.Units = VariableBuildingData.Units;
        }
        
        this.scene.Buildings.add(Building);
        return Building;
    }

    public CreateNewPlayerBuilding ( scene: Game, type: string, x: number, y: number ) {

        let Building = this.CreateBuilding(scene, type, x, y);
        if ( Building == null ) return;

        Building.IsPlayerOwned = true;

        let Map = GD.CurrentMap;
        if ( GD.PlayerTowns[Map] == undefined ) {
            GD.PlayerTowns[Map] = {
                Name: "New Town",
                Buildings: [],
                StorageMax: 0,
                Storage: []
            };
        }

        GD.PlayerTowns[Map].Buildings.push({
            type: type,
            x: x,
            y: y,
            area: GD.CurrentMap,
            level: 1
        });


        if ( Building instanceof TownCentre ) {
            Building.CreateBuildZone();
            this.scene.TownCentre = Building;
        }

        this.scene.Buildings.add(Building);

        return Building;
    }

    public CreateSavedPlayerBuilding ( scene: Game, building: { type: string, x: number, y: number, area: string, level: number } ) {
        let Building = this.CreateBuilding(scene, building.type, building.x, building.y);
        if ( Building == null ) return;
        Building.IsPlayerOwned = true;
        if ( Building instanceof TownCentre ) {
            Building.CreateBuildZone();
            this.scene.TownCentre = Building;
        }
        this.scene.Buildings.add(Building);
        return Building;
    }

    Activate ( Building: string ) : void {

        if ( !GD.UnlockedBuildings.includes(Building) ) {
            this.UI.EventLog.NewEvent(`You have not unlocked ${Building} yet`);
            return;
        }

        if ( Building == "Town Centre" && this.scene.TownCentre !== null ) {
            this.scene.TownCentre.BuildZone.setVisible(false);
            this.Deactivate();
            this.UI.EventLog.NewEvent("You can only have one town centre per region");
            return;
        }

        this.scene.SelectedBuilding = Building;
        this.Placeholder.setVisible(true);
        this.UI.BuidlingPlacementModeHelpText.setVisible(true);
        this.UI.TownManagementPanel.Hide();
        this.Placeholder.setActive(true);
        this.BuildingPlacementMode = true;

        if ( this.scene.TownCentre !== null && this.scene.TownCentre.BuildZone !== undefined ) {
            this.scene.TownCentre.BuildZone.setVisible(true);
        }

    }

    Deactivate () : void {
        this.scene.SelectedBuilding = "";
        this.Placeholder.setVisible(false);
        this.Placeholder.setActive(false);
        this.BuildingPlacementMode = false;
        this.UI.BuidlingPlacementModeHelpText.setVisible(false);
        this.UI.TownManagementPanel.Hide();
        this.Placeholder.setPosition(0, 0);
        this.scene.events.emit('Building-Mode-Deactivated');
        if ( this.scene.TownCentre !== null && this.scene.TownCentre.BuildZone !== undefined ) {
            this.scene.TownCentre.BuildZone.setVisible(false);
            return;
        }
    }

    CheckIfPlacementValid () {

        if ( this.BuildingPlacementMode == false ) return;
 
        // Get the size of the currently selected building
        //let Size = this.scene.DataManager.BuildingData.find((b) => b.Name == this.scene.SelectedBuilding)?.Size ?? null;
        //if ( Size == null ) return this.Deactivate();

        // Get the tile the mouse is currently hovered on
        const tile = this.scene.Map.worldToTileXY(this.scene.mouseX, this.scene.mouseY);

        // Get the x and y positions of this tile
        const world = this.scene.Map.tileToWorldXY(tile.x, tile.y);

        // Set the placeholder to this x and y
        this.Placeholder.setPosition(world.x, world.y);
        //this.Placeholder.setPlaceholder(Size);

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

        //const tiles = this.scene.Map.getTilesWithinWorldXY( world.x, world.y, Size, Size, null, this.scene.cameras.main, "Collision" );
        //const overlapping = tiles.find( (tile) => tile.index !== -1 );

        /*let overlapping_building = false;
        this.scene.physics.overlap(this.Placeholder, this.scene.Buildings, (overlap) => {
            overlapping_building = true;
        }, null, this);

        this.scene.physics.overlap(this.Placeholder, this.scene.Trees, (overlap) => {
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
        }*/

    }

}