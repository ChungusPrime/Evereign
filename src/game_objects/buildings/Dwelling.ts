import Game from '../../scenes/Game';
import Building from '../Building';
import { GD } from '../../scenes/Game';

export default class Dwelling extends Building {

    public Tier: number = 1;
    public Data: WorldData;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject, isPlayerOwned: boolean = false ) {

        super( scene, object.x, object.y, "Buildings", "dwelling1");

        //console.log(id);
        //console.log(data);
        //console.log(TiledProperties);
        //console.log(PlayerOwned);
        //this.ID = id;
        //this.IsPlayerOwned = PlayerOwned;

        //console.log(object);

        this.ID = null;
        
        if ( object.properties ) {
            this.ID = object.properties[0].value ?? null;
        }

        this.IsPlayerOwned = isPlayerOwned;

        this.Data = GD.WorldData[GD.CurrentMap][this.ID] ?? null;

        //console.log(this.Data);

        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.rightButtonDown() ) {
                console.log(this.Data);
            }
        });

        return this;
    }
    
}