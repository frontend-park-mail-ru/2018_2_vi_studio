const MAP_WIDTH = 10;
const MAP_HEIGHT = 11;
const NULL_GATE = 0;
const NOT_NULL_GATE = 1;

const YELLOW = 1;
const GREEN = 2;
const BLUE = 3;


class TileBase {
    constructor(posX, posY, gates) {
        this.x = posX;
        this.y = posY;
        this.gates = gates.slice(0);
    }
}

class TileEmpty extends Tile {
    constructor(posX, posY) {
        super(posX, posY, [0, 0, 0, 0, 0, 0]);
    }
}

class TileCenter extends Tile {
    constructor(posX, posY) {
        super(posX, posY);
        // this.emeralds = [GREEN, GREEN, GREEN, GREEN, GREEN, BLUE]
    }

}

class Emerald {
    constructor(type, posX, posY, gate) {
        this.type = type;
        this.posX = posX;
        this.posY = posY;
        this.gate = gate;
    }
}

class TileWays extends Tile {
    constructor(posX, posY, waysCount, ways) {
        super(posX, posY);
        this.waysCount = waysCount;
        this.ways = ways;
    }

    rotate() {
        this.ways.forEach(way => {
            way.gate1 = (way.gate1 + 1) % 6;
            way.gate2 = (way.gate2 + 1) % 6;
        });
    }
}

class TileMain extends

class Gate {
    constructor(type, users) {
        if (type === NULL_GATE) {
            this.type = type;
        } else {
            this.type = NOT_NULL_GATE;
            this.users = users;
        }
    }
}

export class TileMap {
    constructor() {
        this.map = []
        // for( let i = 0; i < MAP_HEIGHT; i++) {
        //     this.map = []
        // }
        map[0] = [undefined, undefined, undefined, new Gate(NULL_GATE),]
    }

}
