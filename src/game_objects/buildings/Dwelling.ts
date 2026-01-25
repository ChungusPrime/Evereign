import Game from '../../scenes/Game';
import Building from '../Building';
import { GD } from '../../scenes/Game';

export default class Dwelling extends Building {

    public Tier: number = 1;
    public Data: WorldData;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "dwelling1", object);
        this.Data = GD.WorldData[GD.CurrentMap][this.ID] ?? null;
        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.rightButtonDown() ) {
                console.log(this.Data);
            }
        });

        return this;
    }
    
}