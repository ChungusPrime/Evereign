import Town from '../../scenes/Game';
import Building from '../Building';

export default class Warehouse extends Building {

    public width: number = 128;
    public height: number = 128;
    
    public description: string = `The warehouse provides storage space for all kinds of resources`;
    public PeopleCapacity: number = 0;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public ResourceStorageIncrease: number = 1000;
    public AggroZone: boolean = false;

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Warehouse", 1 );
        return this;
    }

}