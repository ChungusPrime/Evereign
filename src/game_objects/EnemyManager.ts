import Game from "../scenes/Game";
import UI from "../scenes/UI";

import GoblinSlinger from "./enemies/GoblinSlinger";
import GoblinRaider from "./enemies/GoblinRaider";
import WarbossGorgutz from "./enemies/WarbossGorgutz";
import Enemy from "./Enemy";
import Building from "./Building";

export default class EnemyManager {

    public scene: Game;
    public UI: UI;
    public Enemies: Phaser.GameObjects.Group;

    constructor ( scene: Game, ui: UI ) {
        this.scene = scene;
        this.UI = ui;
        this.Enemies = this.scene.add.group([], { runChildUpdate: true, classType: Enemy });
    }

    public SpawnMapEnemy ( enemy: Phaser.Types.Tilemaps.TiledObject ) {

        let X = enemy.x ?? 0;
        let Y = enemy.y ?? 0;

        let Enemy = this.SpawnEnemy(enemy.name, X, Y);

        if ( Enemy == null ) {
            return false;
        }
            
        let EnemyData = this.scene.DataManager.GetEnemyData(enemy.id);
        Enemy.setData(EnemyData);

        if ( EnemyData !== null && this.scene.DataManager.GameData.ProgressFlags.includes(EnemyData.OnDestroyAddFlag) ) {
            Enemy.destroy();
            return false;
        }

        this.Enemies.add(Enemy);

    }

    public SpawnBuildingEnemy ( name: string, x: number, y: number, SpawnLocation: Building ) {
        let Enemy = this.SpawnEnemy(name, x, y);
        Enemy.SpawnLocation = SpawnLocation;
        this.Enemies.add(Enemy);
        return Enemy;
    }

    private SpawnEnemy ( name: string, x: number, y: number ) {
        let Instance = null;
        if ( name == "Goblin Slinger" ) {
            Instance = new GoblinSlinger(this.scene, { x: x, y: y });
        } else if ( name == "Goblin Raider" ) {
            Instance = new GoblinRaider(this.scene, { x: x, y: y });
        } else if ( name == "Warboss Gorgutz" ) {
            Instance = new WarbossGorgutz(this.scene, { x: x, y: y });
        }
        return Instance;

    }

}