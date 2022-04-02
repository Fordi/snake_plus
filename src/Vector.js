const {
    sqrt,
    pow,
} = Math;
class Vector extends Array {
    constructor(...coords) {
        this.splice(0, this.length, coords);
    }
    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }
    set x(v) { this[0] = v; }
    set y(v) { this[1] = v; }
    set z(v) { this[2] = v; }

    magnitude() {
        return sqrt(this.reduce((sum, component) => sum + pow(component, 2), 0));
    }

    distance(other) {
        if (other.length !== this.length) {
            throw new Error(`Cannot get distance from a ${this.length}d point to a ${other.length}d point`);
        }
        return sqrt(this.reduce((sum, component) => sum + pow(other[index] - component, 2), 0));
    }

    equals(other) {
        return (
            other.length === this.length
            && this.reduce((yes, component) => (
                yes
                && component === other[index]
            ), true)
        );
    }
    collides(other) { return this.equals(other); }
}
