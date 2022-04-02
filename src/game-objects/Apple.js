import Vector from '../Vector.js';

const {
    floor,
    random,
} = Math;

export default class Apple extends Vector {
    constructor({ board, spriteId, alive, pos = [] }) {
        super(...pos);
        Object.assign(this, { board, spriteId, alive });
    }
    place(...avoid) {
        do {
            this.board.bounds.forEach((bound, index) => {
                this[index] = floor(random() * bound);
            });
        } while (!avoid.reduce((avoided, vec) => avoided && !vec.collides(this), true));
        this.alive = true;
    }

    collides(other) {
        return this.alive && super(other); 
    }

    draw(tick) {
        if (!this.alive) return;
        const pos = this.board.transform(this);
        sprite(this.spriteId, pos.x, pos.y);
    }
}
