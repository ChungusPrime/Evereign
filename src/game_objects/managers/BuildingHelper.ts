import Inn from "../buildings/Inn";
import Farm from "../buildings/Farm";
import Building from "../Building";
import TownCentre from "../buildings/TownCentre";
import Warehouse from "../buildings/Warehouse";
import BallistaTower from "../buildings/BallistaTower";
import GoblinOutpost from "../buildings/OrcOutpost";
import Dwelling from "../buildings/Dwelling";
import Market from "../buildings/Market";
import GoblinTower from "../buildings/OrcTower";
import Game from "../../scenes/Game";
import UI from "../../scenes/UI";
import { GD } from "../../scenes/Game";
import { TownNames } from "../../data/TownNames";
import BuildingData from "../../data/BuildingData";
import GameObjectsMap from "../../data/GameObjects";

export default class BuildingHelper {

    public scene: Game;
    public UI: UI;
    public ValidPlacement: boolean = true;
    public BuildingPlacementMode: boolean = false;
    public Placeholder: Phaser.GameObjects.Rectangle;

    constructor ( scene: Game, UI: UI ) {
        this.scene = scene;
        this.UI = UI;
        this.Placeholder = this.scene.add.rectangle(0, 0, 0, 0, 0xdb382c, 0.8);
        this.scene.add.existing(this.Placeholder);
        this.scene.physics.add.existing(this.Placeholder);
        this.Placeholder.setOrigin(0).setSize(0, 0).setFillStyle(0xdb382c, 0.8).setDepth(99999999).setActive(false).setVisible(false);
        console.log(BuildingData);
    }

    public SetPlaceholder (Width: number, Height: number) {
        this.Placeholder.setSize(Width, Height).setActive(true).setVisible(true);
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
            "Orc Outpost": GoblinOutpost,
            "Orc Tower": GoblinTower
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
        if ( type == "Orc Stronghold" ) return;

        const StaticBuildingData = this.scene.DataManager.GetBuildingData(id);

        const SavedBuildingData = GD.WorldData[GD.CurrentMap][id];
        if ( SavedBuildingData !== undefined && SavedBuildingData.Destroyed == true ) return;

        let Building = this.CreateBuilding(scene, type, x, y);
        if ( Building == null ) return;

        /*if ( StaticBuildingData != null ) {
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
        }*/
        
        this.scene.Buildings.add(Building);
        return Building;
    }

    ActivateBuildingMode ( Building: string ) : void {

        /*if ( !GD.UnlockedBuildings.includes(Building) )
            return this.UI.EventLog.NewEvent(`You have not unlocked ${Building} yet`);
        */

        console.log(this.scene.TownCentre);

        if ( Building == "Town Centre" && this.scene.TownCentre !== null ) {
            this.scene.TownCentre.BuildZone.setVisible(false);
            this.DeactivateBuildingMode();
            this.UI.EventLog.NewEvent("You can only have one town centre per region");
            return;
        }

        this.scene.SelectedBuilding = Building;
        this.Placeholder.setActive(true).setVisible(true);
        this.UI.BuidlingPlacementModeHelpText.setVisible(true);
        this.UI.TownManagementPanel.Hide();
        this.BuildingPlacementMode = true;

        if ( this.scene.TownCentre !== null && this.scene.TownCentre.BuildZone !== undefined ) {
            this.scene.TownCentre.BuildZone.setVisible(true);
        }

    }

    DeactivateBuildingMode () : void {
        this.scene.SelectedBuilding = "";
        this.Placeholder.setVisible(false).setActive(false).setPosition(0, 0);
        this.BuildingPlacementMode = false;
        this.UI.BuidlingPlacementModeHelpText.setVisible(false);
        this.UI.TownManagementPanel.Hide();
        this.scene.events.emit('Building-Mode-Deactivated');
        if ( this.scene.TownCentre !== null && this.scene.TownCentre.BuildZone !== undefined ) {
            this.scene.TownCentre.BuildZone.setVisible(false);
            return;
        }
    }

    CreatePlayerBuilding ( type: string, x: number, y: number ) {

        if ( GD.PlayerTowns[GD.CurrentMap] == undefined ) {
            GD.PlayerTowns[GD.CurrentMap] = { 
                Name: TownNames[Math.floor(Math.random() * TownNames.length)],
                Buildings: [],
                StorageMax: 0,
                Storage: []
            };
        }

        let PlayerBuldingData = {
            id: crypto.randomUUID(),
            type: type,
            name: `New ${type}`,
            x: x,
            y: y,
            area: GD.CurrentMap,
            level: 1
        };

        GD.PlayerTowns[GD.CurrentMap].Buildings.push(PlayerBuldingData);

        console.log(GD.PlayerTowns);

        let buildingInstance = GameObjectsMap[type];

        let newBuilding = new buildingInstance(this.scene, PlayerBuldingData) as Building;

        newBuilding.IsPlayerOwned = true;

        if ( newBuilding instanceof TownCentre ) {
            newBuilding.CreateBuildZone();
            this.scene.TownCentre = newBuilding;
        }

        this.scene.Buildings.add(newBuilding);

    }

    CheckIfPlacementValid () {

        if ( this.BuildingPlacementMode == false ) 
            return console.log("Not in building placement mode");
 
        // Get the size of the currently selected building
        let Size = BuildingData[this.scene.SelectedBuilding].Size ?? null;
        if ( Size == null ) {
            console.error(`Building data for ${this.scene.SelectedBuilding} not found`);
            return this.DeactivateBuildingMode();
        }
            
        // Get the tile the mouse is currently hovered on
        const tile = this.scene.Map.worldToTileXY(this.scene.mouseX, this.scene.mouseY);

        // Get the x and y positions of this tile
        const world = this.scene.Map.tileToWorldXY(tile.x, tile.y);

        // Set the placeholder to this x and y
        this.Placeholder.setPosition(world.x, world.y);
        this.SetPlaceholder(Size.Width, Size.Height);

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

        console.log(`Checking placement for ${this.scene.SelectedBuilding} at (${world.x}, ${world.y})`);

        // Get "Collision" layer tiles in the placeholder area
        const tiles = this.scene.Map.getTilesWithinWorldXY( world.x, world.y, Size.Width, Size.Height, null, this.scene.cameras.main, "Collision" );
        console.log(tiles);

        const overlapping = tiles.find( (tile) => tile.index !== -1 );
        console.log(overlapping);

        if ( overlapping == undefined ) {
            console.log("Valid placement for Town Centre");
            this.Placeholder.setFillStyle(0x44a617, 0.8);
            this.ValidPlacement = true;
        } else {
            this.Placeholder.setFillStyle(0xdb382c, 0.8);
            this.ValidPlacement = false;
        }

        /*
        let OverlapObject = false;
        this.scene.physics.overlap(this.Placeholder, this.scene.Buildings, (overlap) => { OverlapObject = true; }, null, this);
        this.scene.physics.overlap(this.Placeholder, this.scene.Trees, (overlap) => { OverlapObject = true; }, null, this);

        console.log(OverlapObject);

        if ( this.scene.SelectedBuilding == "Town Centre" ) {
            if ( overlapping == undefined && !OverlapObject ) {
                console.log("Valid placement for Town Centre");
                this.Placeholder.setFillStyle(0x44a617, 0.8);
                this.ValidPlacement = true;
            } else {
                console.log("Invalid placement for Town Centre");
                this.Placeholder.setFillStyle(0xdb382c, 0.8);
                this.ValidPlacement = false;
            }
        } else {
            if ( overlapping == undefined && !OverlapObject && isContained ) {
                this.Placeholder.setFillStyle(0x44a617, 0.8);
                this.ValidPlacement = true;
            } else {
                this.Placeholder.setFillStyle(0xdb382c, 0.8);
                this.ValidPlacement = false;
            }
        }
            */

    }

}