import Game from '../../scenes/Game';
import Building from '../Building';

export default class Inn extends Building {
    public width: number = 128;
    public height: number = 64;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    constructor ( scene: Game, x: number, y: number, id: string, data: WorldData, TiledProperties: Phaser.Types.Tilemaps.TiledObject ) {
        super( scene, x, y, "Buildings", "inn1");
        this.on('pointerdown', () => {
            this.scene.UI.RestMenu.showMenu();
        });
        return this;
    }
}