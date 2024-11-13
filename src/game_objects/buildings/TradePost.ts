import Town from '../../scenes/Game';
import Building from '../Building';

export default class TradePost extends Building {
    ProductsPerTick: { ID: number; Amount: number; }[] = [];
    width: number = 128;
    height: number = 128;
    public AggroZone: boolean = false;

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Market", 1 );
        return this;
    }

}