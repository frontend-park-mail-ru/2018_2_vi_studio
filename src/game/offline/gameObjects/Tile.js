export default class Tile {
    constructor() {
      this.gates = null;
      this.rotationCount = 0;
    };

    setRotation(rotationCount) {
        if (this.gates) {
            for(let i = 0; i < rotationCount; i++) {
                const last = this.gates.pop();
                this.gates.unshift(last);
                this.gates = this.gates.map(gate => (gate + 1) % 6);
            }
        }
        this.rotationCount = rotationCount;
    }
}