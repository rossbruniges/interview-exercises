'use strict'

const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`

function orientation2Degs(o) {
    switch (o) {
        case 'N':
            return 0;
        case 'E':
            return 90;
        case 'S':
            return 180;
        case 'W':
            return 270;
    }       
}

class Coord {
    constructor(data) {
        let points = data.split(' ');
        this.x = Number(points[0]);
        this.y = Number(points[1]);
        this.dir = orientation2Degs(points[2]);
    }

    render() {
        return `${this.x} ${this.y} ${this.dir}`
    }
}

class Martian {
    constructor(start, sequence, bounds) {
        this.location = new Coord(start);
        this.sequence = sequence;   
        this.bounds = bounds;
        this.lost = false;
    }

    move(direction) {
        let angle = this.location.dir;
        if (direction === 'F') {
            switch (this.location.dir) {
                case 0:
                    this.location.y = this.location.y + 1;
                    break;
                case 90:
                    this.location.x = this.location.x + 1;
                    break;
                case 180:
                    this.location.y = this.location.y - 1;
                    break;
                case 270:
                    this.location.x = this.location.x - 1;
                    break;
            }
        }
        if (direction === 'L') {
            if (this.location.dir - 90 < 0) {
                this.location.dir = 270;
            } else {
               this.location.dir = this.location.dir - 90;
            }
        }
        if (direction === 'R') {
            if (this.location.dir + 90 > 270) {
                this.location.dir = 0;
            } else {
               this.location.dir = this.location.dir + 90;
            }
        }
    }

    checkBounds() {
        if (this.location.x > this.bounds.x) {
            this.lost = true;
        }
        if (this.location.y > this.bounds.y) {
            this.lost = true;
        }
    }

    runSequence() {
        let output = "";
        this.sequence.split('').forEach(function(i) {
            this.move(i);
            this.checkBounds();
        }, this);
        output = this.location.render();
        if (this.lost) {
            output += ' LOST';
        }
        console.log(output);
    }
}

class World {
    constructor(data) {
        this.coords = new Coord(data.shift());
        this.martians = [];

        for (var i = 0, l = data.length; i < l; i += 3) {
            this.martians.push(new Martian(data[i], data[i+1], this.coords));
        }
    }

    plotRobots() {
        this.martians.forEach(function(i) {
            i.runSequence();
        })
    }
}

let Mars = new World(input.split('\n'));

Mars.plotRobots();
