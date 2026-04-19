import Game from "../scenes/Game";
import { GD } from "../scenes/Game";
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';

import FloatingText from "../game_objects/FloatingText";
import Projectile from "../game_objects/Projectile";
import Building from "../game_objects/Building";
import PlayerCharacter from "../game_objects/PlayerCharacter";
import Enemy from "../game_objects/Character";
import Chest from "../game_objects/Chest";
import MiningNode from "../game_objects/MiningNode";
import Obstacle from "../game_objects/Obstacle";
import Switch from "../game_objects/Switch";

// Plants
import Bloomberry from "../game_objects/plants/Bloomberry";
import Marigold from "../game_objects/plants/Marigold";
import MunklesBrightcap from "../game_objects/plants/MunklesBrightcap";

// Trees
import OakTree from "../game_objects/plants/WillowTree";

// Zones
import FishingZone from "../game_objects/Zones/FishingZone";
import RespawnZone from "../game_objects/Zones/Respawn";
import Transition from "../game_objects/Zones/Transition";
import TriggerZone from "../game_objects/Zones/TriggerZone";

// Buildings
import Market from "../game_objects/buildings/Market";
import Warehouse from "../game_objects/buildings/Warehouse";
import Inn from "../game_objects/buildings/Inn";
import Field from "../game_objects/buildings/Field";
import GoblinOutpost from "../game_objects/buildings/OrcOutpost";
import Mine from "../game_objects/buildings/Mine";
import Dwelling from "../game_objects/buildings/Dwelling";
import TownCentre from "../game_objects/buildings/TownCentre";
import Farm from "../game_objects/buildings/Farm";
import Chapel from "../game_objects/buildings/Chapel";

// NPCs
import WarbossGorgutz from "../game_objects/characters/WarbossGorgutz";
import GoblinSlinger from "../game_objects/characters/GoblinSlinger";
import StoneDeposit from "../game_objects/deposits/StoneDeposit";
import IronDeposit from "../game_objects/deposits/IronDeposit";
import GoblinFirepit from "../game_objects/lights/GoblinFirepit";
import Torch from "../game_objects/lights/Torch";
import BallistaTower from "../game_objects/buildings/BallistaTower";
import TorchPole from "../game_objects/lights/TorchPole";

export default class MapBuilder {

    public scene: Game;

    constructor ( scene: Game ) {
        this.scene = scene;
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
        let Layers: (Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer)[] = [];
        Map.getTileLayerNames().forEach( (name: string) => {
            let Layer = Map.createLayer(name, Tilesets, 0, 0);
            if ( Layer === null ) return;
            if ( name == "Collision" ) {
                this.scene.CollisionLayer = Layer;
                this.scene.CollisionLayer.setCollisionByExclusion([-1]);
                this.scene.CollisionLayer.setVisible(false);
            }
            Layer.setLighting(true);
            Layers.push(Layer);
        });

        // Get default campaign data
        const Campaign = this.scene.DataManager.CampaignData.find( (campaign) => campaign.ID == GD.Campaign );

        const objectTypeToClass: { [key: string]: any } = {
            "Oak Tree": OakTree,
            "Stone Deposit": StoneDeposit,
            "Marigold": Marigold,
            "Iron Deposit": IronDeposit,
            "Bloomberry": Bloomberry,
            "Munkle's Brightcap": MunklesBrightcap,
            "Torch": Torch,
            "Goblin Firepit": GoblinFirepit,
            "Dwelling": Dwelling,
            "Trigger": TriggerZone,
            "Goblin Slinger": GoblinSlinger,
            "Inn": Inn,
            "Ballista Tower": BallistaTower,
            "TorchPole": TorchPole
            /*"Town Centre": TownCentre,
            "Goblin Outpost": GoblinOutpost,
            "Dwelling": Dwelling,
            "Market": Market,
            "Warehouse": Warehouse,
            "Field": Field,
            "Mine": Mine,
            "Farm": Farm,
            "Chapel": Chapel,*/
            /*"Warboss Gorgutz": WarbossGorgutz,
            "Chest": Chest,
            "Obstacle": Obstacle,
            "Fishing Spot": FishingZone,
            "Graveyard": RespawnZone,
            "Transition": Transition,
            "Switch": Switch*/
        };

        // Objects
        Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {
            layer.objects = layer.objects.sort((a, b) => a.id - b.id);
            layer.objects.forEach( (object) => {
                const Instance = objectTypeToClass[object.type];
                if (Instance) {
                    let instance = new Instance(this.scene, object, false) as Phaser.GameObjects.GameObject;
                    if ( instance instanceof Building ) {
                        this.scene.Buildings.add(instance);
                    }
                }
            });
        });
        
        /*if ( GD.PlayerTowns[GD.CurrentMap] !== undefined ) {
            console.log("Loading player buildings for " + GD.CurrentMap);
            GD.PlayerTowns[GD.CurrentMap].Buildings.forEach((building: { type: string, x: number, y: number, area: string, level: number }) => {
                this.scene.BuildingHelper.CreateSavedPlayerBuilding(this.scene, building);
            });
        }*/
        
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
            //this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, { message: `-${projectile.damage}`, x: enemy.x, y: enemy.y }));
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
        
        let MapType = Campaign.WorldData[GD.CurrentMap].Information.Type;

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

}