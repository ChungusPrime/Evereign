import Town from '../../scenes/Game';
import Building from '../Building';

export default class Dwelling extends Building {

    public width: number = 128;
    public height: number = 128;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Dwelling", 1 );
        return this;
    }

}