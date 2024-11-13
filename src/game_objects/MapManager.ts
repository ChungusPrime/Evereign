import Game from "../scenes/Game";
import MiningNode from "./MiningNode";
import Tree from "./Tree";

export default class MapManager {

    public scene: Game;
    public currentMap!: string;
    public CollisionLayer!: Phaser.Tilemaps.TilemapLayer;
    public NavMesh: any;
    public navMeshPlugin: any;
    public Tilesets: Phaser.Tilemaps.Tileset[] = [];
    public Layers: Phaser.Tilemaps.TilemapLayer[] = [];
    public MapObjects: Phaser.GameObjects.Sprite[] = [];
    public Trees: Phaser.GameObjects.Group;
    public Nodes: Phaser.GameObjects.Group;
    public MapRespawnPoint: Phaser.GameObjects.Rectangle | null = null;

    public SpritesheetsToLoad: string[] = [
        "RA_Animated_Water",
        "RA_Graveyard",
        "RA_Ground_Tiles",
        "RA_Jungle",
        "RA_Jungle_Extras",
        "RA_Village",
        "RA_Village_Animations",
        "RA_Wasteland_Water",
        "tree03_s_01_animation",
    ];

    constructor ( scene: Game ) {
        this.scene = scene;
        this.Layers = [];
    }

    create ( map: string ): Phaser.Tilemaps.Tilemap {

        this.currentMap = map;

        let Map = this.scene.make.tilemap({
            key: this.currentMap
        });

        this.Trees = this.scene.add.group([]);
        this.Nodes = this.scene.add.group([]);

        // Load Tilesets
        this.SpritesheetsToLoad.forEach ( ( name: string ) => {
            let Spritesheet = Map.addTilesetImage(name, name, 32, 32);
            if ( Spritesheet === null ) return;
            this.Tilesets.push(Spritesheet);
        });

        // Load Layers
        Map.getTileLayerNames().forEach( (name: string) => {
            let Layer = Map.createLayer(name, this.Tilesets, 0, 0);
            if ( Layer === null ) return;
            if ( name == "Collision" ) {
                this.CollisionLayer = Layer;
                this.CollisionLayer.setCollisionByExclusion([-1]);
                this.CollisionLayer.setVisible(false);
            }
            Layer.initPipeline("Light2D");
            this.Layers.push(Layer);
        });
        
        // Objects
        Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {

            if ( layer.name == "Buildings" ) {
                layer.objects.forEach( (building: Phaser.Types.Tilemaps.TiledObject) => {
                    this.scene.BuildingManager.CreateBuildingFromMapData(this.scene, building.type, building.x, building.y, building.id);
                });
            }

            if ( layer.name == "Trees" ) {
                layer.objects.reverse().forEach( (tree: Phaser.Types.Tilemaps.TiledObject) => {
                    this.Trees.add(new Tree( this.scene, tree.x, tree.y, tree.width, tree.height, tree.name ));
                });
            }

            if ( layer.name == "Mining Nodes" ) {
                layer.objects.reverse().forEach( (node: Phaser.Types.Tilemaps.TiledObject) => {
                    this.Nodes.add(new MiningNode( this.scene, node.x, node.y, node.width, node.height, node.name ));
                });
            }

            if ( layer.name == "Lights" ) {
                layer.objects.forEach((light: Phaser.Types.Tilemaps.TiledObject) => {
                    this.scene.lights.addLight(light.x, light.y, 160, 0xe3a456, 1);
                });
            }

            if ( layer.name == "Zones" ) {
                layer.objects.forEach((zone: Phaser.Types.Tilemaps.TiledObject) => {
                    if ( zone.name == "Graveyard" ) {
                        let RespawnZone = this.scene.add.rectangle(zone.x, zone.y, 32, 32, 0xff0000, 0.5).setOrigin(0, 0);
                        this.MapRespawnPoint = RespawnZone;
                    }
                });
            }

            if ( layer.name == "Characters" ) {
                layer.objects.forEach((enemy: Phaser.Types.Tilemaps.TiledObject) => {
                    this.scene.EnemyManager.SpawnMapEnemy(enemy);
                });
            }

            if ( layer.name == "Objects" ) {
                layer.objects.forEach((object: Phaser.Types.Tilemaps.TiledObject) => {
                    let Flag = object.properties[0].value ?? null;
                    let Frame = object.properties[1].value ?? null;
                    if ( Flag !== null && !this.scene.DataManager.GameData.ProgressFlags.includes(Flag) ) {
                        if ( object.x == undefined || object.y == undefined ) return;
                        let obj = this.scene.physics.add.sprite(object.x, object.y, "RA_Village", Frame).setOrigin(0, 1).setImmovable(true).setPipeline("Light2D");
                        obj.setData('Flag', Flag);
                        this.MapObjects.push(obj);
                    }
                });
            }
            
        });

        if ( this.scene.DataManager.GameData.PlayerTowns[this.currentMap] !== undefined ) {
            this.scene.DataManager.GameData.PlayerTowns[this.currentMap].Buildings.forEach((building: { x: number, y: number, area: string, type: string }) => {
                this.scene.BuildingManager.CreateSavedPlayerBuilding(this.scene, building.type, building.x, building.y);
            });
        }

        return Map;
    }

    CreateNavMesh () {
        this.NavMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", Map, [ this.CollisionLayer ]);
    }

    GetNavMeshPath () {
        //const path = navMesh.findPath({ x: 0, y: 0 }, { x: 300, y: 400 });
        //navMesh.enableDebug();
        //navMesh.debugDrawClear();
        //navMesh.debugDrawMesh({
        //    drawCentroid: true,
        //    drawBounds: false,
        //    drawNeighbors: true,
        //    drawPortals: true
        //});
        //navMesh.debugDrawPath(path, 0xffd900);
    }

}