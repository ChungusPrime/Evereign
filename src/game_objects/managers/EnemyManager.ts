import Game from "../../scenes/Game";
import GoblinSlinger from "../characters/GoblinSlinger";
import GoblinRaider from "../characters/GoblinRaider";
import WarbossGorgutz from "../characters/WarbossGorgutz";
import Building from "../Building";
import { GD } from "../../scenes/Game";

export default class EnemyManager {

    public scene: Game;

    constructor ( scene: Game ) {
        this.scene = scene;
    }

    public SpawnMapEnemy ( enemy: Phaser.Types.Tilemaps.TiledObject ) {
        let Data = GD.WorldData[GD.CurrentMap][enemy.id];
        if ( Data == null ) return false;
        if ( Data.Alive == false ) return; //this.scene.Enemies.remove(Enemy, true, true);
        let X = enemy.x ?? 0;
        let Y = enemy.y ?? 0;
        let Enemy = this.SpawnEnemy(enemy.name, X, Y, 1);
        Enemy.ID = enemy.id;
        if ( Enemy == null ) return false;
        this.scene.Enemies.add(Enemy);
    }

    public SpawnBuildingEnemy ( name: string, x: number, y: number, SpawnLocation: Building, Level: number = 1 ) {
        let Enemy = this.SpawnEnemy(name, x, y, Level);
        Enemy.SpawnLocation = SpawnLocation;
        this.scene.Enemies.add(Enemy);
        return Enemy;
    }

    private SpawnEnemy ( name: string, x: number, y: number, level: number ) {

        // Mapping of enemy types to their respective classes
        const enemyClasses: { [key: string]: any } = {
            "Goblin Slinger": GoblinSlinger,
            "Goblin Raider": GoblinRaider,
            "Warboss Gorgutz": WarbossGorgutz,
        };

        // Check if the type is valid and create an instance of the appropriate enemy
        const EnemyClass = enemyClasses[name];
        if (EnemyClass) {
            return new EnemyClass(this.scene, { x: x, y: y }, level);
        }

        // Return null if the type is not valid
        return null;

    }

}


