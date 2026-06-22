import { Quadtree, Rectangle} from '@timohausmann/quadtree-ts';

export class PlayerRect extends Rectangle {

}

export class EnemyRect extends Rectangle {
    public enemy: any;
    constructor( props: { x: number, y: number, width: number, height: number, data: any } ) {
        super(props);
        this.enemy = props.data;
    }
}