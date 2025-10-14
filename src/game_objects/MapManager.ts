import Game from "../scenes/Game";
import { GD } from "../scenes/Game";
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';

import FloatingText from "./FloatingText";
import Projectile from "./Projectile";
import Building from "./Building";
import PlayerCharacter from "./PlayerCharacter";
import Enemy from "./Character";
import Chest from "./Chest";
import MiningNode from "./MiningNode";
import Obstacle from "./Obstacle";
import Switch from "./Switch";

// Plants
import Bloomberry from "./plants/Bloomberry";
import Marigold from "./plants/Marigold";
import MunklesBrightcap from "./plants/MunklesBrightcap";

// Trees
import OakTree from "./plants/OakTree";

// Zones
import FishingZone from "./Zones/FishingZone";
import RespawnZone from "./Zones/Respawn";
import Transition from "./Zones/Transition";
import TriggerZone from "./Zones/TriggerZone";

// Buildings
import Market from "./buildings/Market";
import Warehouse from "./buildings/Warehouse";
import Inn from "./buildings/Inn";
import Field from "./buildings/Field";
import GoblinOutpost from "./buildings/GoblinOutpost";
import Mine from "./buildings/Mine";
import Dwelling from "./buildings/Dwelling";
import TownCentre from "./buildings/TownCentre";
import Farm from "./buildings/Farm";
import Chapel from "./buildings/Chapel";

// NPCs
import WarbossGorgutz from "./characters/WarbossGorgutz";
import GoblinSlinger from "./characters/GoblinSlinger";
import StoneDeposit from "./deposits/StoneDeposit";

export default class MapManager {

    public scene: Game;

    constructor ( scene: Game ) {
        this.scene = scene;
    }

    ClearMap () {
        // Disable collision between player and collision layer
        if ( this.scene.PlayerCollisionLayerCollider !== undefined ) {
            this.scene.PlayerCollisionLayerCollider.active = false;
        }
        
        // Clean up current map
        this.scene.Projectiles.getChildren().forEach((proj: Projectile) => proj.delete());
        this.scene.Projectiles.clear(true, true);
        this.scene.EnemyProjectiles.clear(true, true);
        this.scene.Trees.clear(true, true);
        this.scene.Nodes.clear(true, true);
        this.scene.Chests.clear(true, true);
        this.scene.Plants.clear(true, true);
        this.scene.Zones.clear(true, true);
        this.scene.Enemies.clear(true, true);
        this.scene.Pickups.clear(true, true);
        this.scene.Switches.clear(true, true);
        this.scene.Obstacles.clear(true, true);
        //this.scene.MapLights.forEach((light: Phaser.GameObjects.Light) => this.scene.lights.removeLight(light));
        
        this.scene.Buildings.getChildren().forEach((building: Building) => {
            if ( building.AggroCollider !== undefined ) {
                building.AggroCollider.destroy();
            }
        });
        
        this.scene.Buildings.clear(true, true);
        
        if ( this.scene.Map !== undefined ) {
            this.scene.Map.destroy();
        }
    }

    CreateMap ( scene: Game ) {
    
        this.scene.physics.pause();
        this.scene.physics.disableUpdate();
        this.scene.scene.pause("Game");

        // Clear current map
        this.ClearMap();
        
        // Start building new map
        let Map = this.scene.make.tilemap({
            key: GD.CurrentMap
        });
        
        // Load Tilesets
        let Tilesets: Phaser.Tilemaps.Tileset[] = [];
        Map.tilesets.forEach( (tileset: Phaser.Tilemaps.Tileset) => {
            if ( tileset.total == 1 ) return;
            Tilesets.push(Map.addTilesetImage(tileset.name, tileset.name, 32, 32));
        });
        
        // Load Layers
        let Layers: Phaser.Tilemaps.TilemapLayer[] = [];
        Map.getTileLayerNames().forEach( (name: string) => {
            let Layer = Map.createLayer(name, Tilesets, 0, 0);
            if ( Layer === null ) return;
            if ( name == "Collision" ) {
                this.scene.CollisionLayer = Layer;
                this.scene.CollisionLayer.setCollisionByExclusion([-1]);
                this.scene.CollisionLayer.setVisible(false);
            }
            Layer.setPipeline("Light2D");
            Layers.push(Layer);
        });

        // Get default campaign data
        const Campaign = this.scene.DataManager.CampaignData.find( (campaign) => campaign.ID == GD.Campaign );

        console.log(Map);
        console.log(Campaign);
        console.log(GD);

        const objectTypeToClass: { [key: string]: any } = {
            "Oak Tree": OakTree,
            "Stone Deposit": StoneDeposit,
            "Marigold": Marigold,
            //"Iron Deposit": IronDeposit,
            //"Torch": Torch,
            //"Goblin Firepit": GoblinFirepit,
            //"Warboss Gorgutz": WarbossGorgutz,
            /*"Goblin Slinger": GoblinSlinger,
            "Market": Market,
            "Warehouse": Warehouse,
            "Inn": Inn,
            "Field": Field,
            "Goblin Outpost": GoblinOutpost,
            "Mine": Mine,
            "Dwelling": Dwelling,
            "Town Centre": TownCentre,
            "Farm": Farm,
            "Chapel": Chapel,
            "Chest": Chest,
            "Bloomberry": Bloomberry,
            "Munkle's Brightcap": MunklesBrightcap,
            "Obstacle": Obstacle,
            "Fishing Spot": FishingZone,
            "Graveyard": RespawnZone,
            "Transition": Transition,
            "Trigger": TriggerZone,
            "Switch": Switch*/
        };

        // Objects
        Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {
            layer.objects.forEach( (object) => {
                const obj = objectTypeToClass[object.type];
                if (obj) {

                    // If no properties are defined, initialize with default values and no ID
                    if ( !object.properties || object.properties.length === 0 ) {
                        //console.warn(`Object of type "${object.type}" at (${object.x}, ${object.y}) has no properties, initializing with default values.`);
                        return new obj(this.scene, object.x, object.y, null, null);
                    }

                    // Get custom tiled ID from properties
                    let ID = object.properties[0].value ?? null;

                    // If ID is null, initialize with default values, but with the ID
                    if ( ID === null ) {
                        console.warn(`Object ID is null for object type "${object.type}" at (${object.x}, ${object.y}).`);
                        return new obj(this.scene, object.x, object.y, ID, null);
                    }

                    // If properties and ID are defined, use them to create the object
                    let Data = Campaign.WorldData[GD.CurrentMap][ID] ?? null;
                    let SavedData = GD.WorldData[GD.CurrentMap][ID] ?? null;
                    Object.assign(Data, SavedData);
                    return new obj(this.scene, object.x, object.y, ID, Data);
                    
                }
            });
        });
        
        if ( GD.PlayerTowns[GD.CurrentMap] !== undefined ) {
            GD.PlayerTowns[GD.CurrentMap].Buildings.forEach((building: { type: string, x: number, y: number, area: string, level: number }) => {
                this.scene.BuildingHelper.CreateSavedPlayerBuilding(this.scene, building);
            });
        }
        
        // Set up collisions
        this.scene.physics.world.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);
        
        // Player
        this.scene.PlayerCollisionLayerCollider = this.scene.physics.add.collider(this.scene.PlayerCharacter, this.scene.CollisionLayer);
        this.scene.physics.add.collider(this.scene.PlayerCharacter, this.scene.Buildings);
        this.scene.physics.add.collider(this.scene.PlayerCharacter, this.scene.Obstacles);
        this.scene.physics.add.collider(this.scene.PlayerCharacter, this.scene.Trees);
        this.scene.physics.add.collider(this.scene.PlayerCharacter, this.scene.Nodes);
        
        // Enable collision between pickups and collision layer so they dont go out of bounds
        this.scene.physics.add.collider(this.scene.Pickups, this.scene.CollisionLayer);
        
        // Placeholder collisions
        this.scene.physics.add.collider(this.scene.BuildingHelper.Placeholder, this.scene.Trees);
        this.scene.physics.add.collider(this.scene.BuildingHelper.Placeholder, this.scene.Buildings);
        
        this.scene.physics.add.collider(this.scene.Projectiles, this.scene.Trees, (projectile: Projectile, tree: any) => {
            this.scene.sound.play("KineticBoltHit");
            projectile.delete();
            let hitSprite = this.scene.add.sprite(projectile.x, projectile.y, "BloodArcaneOne", 0).play('blood-arcane-anim-1');
            hitSprite.once('animationcomplete', () => {
                hitSprite.destroy();
            });
        });
        
        this.scene.physics.add.collider(this.scene.Projectiles, this.scene.Nodes, (projectile: Projectile, node) => {
            projectile.delete();
        });
        
        this.scene.physics.add.collider(this.scene.EnemyProjectiles, this.scene.PlayerCharacter, (projectile: Projectile, player: PlayerCharacter) => {
            projectile.destroy();
            player.TakeDamage(projectile.damage);
        });
        
        this.scene.physics.add.collider(this.scene.Projectiles, this.scene.Enemies, (projectile: Projectile, enemy: Enemy) => {
            this.scene.lights.removeLight(projectile.light);
            projectile.destroy();
            this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, { message: `-${projectile.damage}`, x: enemy.x, y: enemy.y }));
            enemy.TakeDamage(projectile.damage);
            this.scene.sound.play("KineticBoltHit");
            let hitSprite = this.scene.add.sprite(projectile.x, projectile.y, "BloodArcaneOne", 0).play('blood-arcane-anim-1');
            hitSprite.once('animationcomplete', () => {
                hitSprite.destroy();
            });
        });
        
        // Set up aggro zones for each building
        this.scene.Buildings.getChildren().forEach( (Building: Building) => {
            if ( !Building.AggroZone ) return;
            let AggroZone = this.scene.physics.add.sprite(Building.getCenter().x - Building.width * 2, Building.getCenter().y - Building.height * 2, "character", 0).setCircle(300);
            Building.AggroCollider = AggroZone;
            this.scene.physics.add.overlap(AggroZone, this.scene.PlayerCharacter, (building: Building, PlayerCharacter: PlayerCharacter) => {
                if ( Building.OnAlert == false ) {
                    Building.OnAlert = true;
                }
            });
        });
        
        this.scene.Quadtree = new Quadtree({
            width: Map.widthInPixels,
            height: Map.heightInPixels,
            x: 0,
            y: 0,
            maxObjects: 20,
            maxLevels: 4
        });
        
        this.scene.Map = Map;
        this.scene.DaytimeCycleManager.SetPhase();
        
        let MapType = Campaign.WorldMapInformation[GD.CurrentMap].Type;
        if ( MapType == "Exterior" ) {
            this.scene.DaytimeCycleManager.StartRaining();
        } else {
            this.scene.DaytimeCycleManager.StopRaining();
        }
        
        // Camera
        this.scene.cameras.main
        .setSize(1024, 720)
        .setZoom(1)
        .setBounds(0, 0, Map.widthInPixels, Map.heightInPixels)
        .centerOn(Map.widthInPixels / 2, Map.heightInPixels / 2)
        .fadeIn(2000, 0, 0, 0, () => {})
        .on('camerafadeincomplete', () => {
            this.scene.PlayerCharacter.PlayerHasControl = true;
        });
        
        // Re-enable collision between player and collision layer
        this.scene.PlayerCollisionLayerCollider.active = true;
        this.scene.physics.resume();
        this.scene.physics.enableUpdate();
        this.scene.scene.resume("Game");
    }

}