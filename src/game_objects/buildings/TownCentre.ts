import Game from '../../scenes/Game';
import Building from '../Building';

export default class TownCentre extends Building {

    public scene: Game;
    public Size: number = 224;
    public HousingSlots: number = 5;
    public AggroZone: boolean = false;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public CurrentJob: string = "";
    public CostMultiplier: number = 5;
    public BuildZone!: Phaser.GameObjects.Rectangle;

    constructor ( scene: Game, x: number, y: number ) {
        super( scene, x, y, "Buildings", "towncentre1");
        this.scene = scene;

        /*if ( this.IsPlayerOwned == true ) {
            let BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 640 + 32 + 1, 640 + 32  + 1, 0xffffff, 0.2).setVisible(false);
            this.scene.physics.world.enable(BuildZone);
            this.BuildZone = BuildZone;
        }
        this.scene.TownCentre = this;*/

        return this;
    }

    public update (delta: number): void {
        /*if ( this.IsPlayerOwned == true ) {
            if ( this.ProductsPerTick.length == 0 ) return;
            this.CurrentTickProgress += delta;
            if ( this.CurrentTickProgress >= this.TickTime ) {
                this.CurrentTickProgress = 0;
                this.ProductsPerTick.forEach(product => {
                    this.scene.Inventory.AddItem(product.ID, product.Amount);
                });
            }
        }*/
    }

}