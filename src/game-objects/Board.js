export default class Board extends Vector {
    constructor({ bounds, scale, game: { screen, rect } }) {
        Object.assign(this, { bounds, scale, screen, rect });        
    }
    size() {
        const { scale, bounds } = this;
        return new Vector(
            scale.x * (bounds.x + 1),
            scale.y * (bounds.y + 1),
        );
    }
    pos() {
        const s = size();
        const hudHeight = scale.y * 2;
        return new Vector(
            Math.floor(screen.x - s.x) / 2,
            Math.floor(screen.y - hudHeight - s.y) / 2 + hudHeight,
        );
    }

    draw(tick) {
        const p = pos();
        const s = size();
        this.rect(p.x, p.y, s.x, s.y);
    }

    outOfBounds(p) {
        return (
            p.x < 0
            || p.x >= this.bounds.x
            || p.y < 0
            || p.u >= this.bounds.y
        );
    }

    // convert a map coordinate into its position on the screen
    transform(v) {
        const p = pos();
        return new Vector(
            v.x * scale.x + p.x + scale.x / 2,
            v.y * scale.y + p.y + scale.y / 2,
        );
    }
}
