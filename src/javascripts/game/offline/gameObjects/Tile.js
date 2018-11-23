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
                for(let i = 0; i < this.gates.length; i++) {
                    this.gates[i] += 1;
                    this.gates[i] %= 6;
                }
            }
        }
        this.rotationCount = rotationCount;
    }
}