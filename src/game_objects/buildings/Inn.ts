import Game from '../../scenes/Game';
import Building from '../Building';

export default class Inn extends Building {
    public width: number = 128;
    public height: number = 64;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "inn1", object);
        this.on('pointerdown', () => {
            this.scene.UI.RestMenu.showMenu();
        });
        return this;
    }
}