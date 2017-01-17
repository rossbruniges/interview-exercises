'use strict'

export class Coord {
    constructor(data) {
        let points = data.split(' ');
        this.directions = ['N', 'E', 'S', 'W'];
        this.x = Number(points[0]);
        this.y = Number(points[1]);
        this.dir = Number(this.convertString(points[2]));
    }

    convertString(point) {
        return this.directions.indexOf(point) * 360/this.directions.length;
    }

    convertNumber(degrees) {
        return this.directions[degrees / (360/this.directions.length)];
    }

    render() {
        return `${this.x} ${this.y} ${this.convertNumber(this.dir)}`
    }
}

export class Martian {
    constructor(start, sequence, bounds) {
        this.location = new Coord(start);
        this.sequence = sequence;   
        this.bounds = bounds;
        this.lost = false;
    }

    proceed() {
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
        this.checkBounds();
    }

    spin(direction) {
        let angle = this.location.dir;
        if (direction === 'L') {
            if (angle - 90 < 0) {
                this.location.dir = 270;
            } else {
               this.location.dir = angle - 90;
            }
        }
        if (direction === 'R') {
            if (angle + 90 > 270) {
                this.location.dir = 0;
            } else {
               this.location.dir = angle + 90;
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
            if (i === 'F') {
                this.proceed();
            } else {
                this.spin(i);
            }
        }, this);
        output = this.location.render();
        if (this.lost) {
            output += ' LOST';
        }
        return output;
    }
}

export class World {
    constructor(data) {
        this.coords = new Coord(data.shift());
        this.martians = [];

        for (var i = 0, l = data.length; i < l; i += 3) {
            this.martians.push(new Martian(data[i], data[i+1], this.coords));
        }
    }

    plotRobots() {
        this.martians.forEach(function(i) {
            console.log(i.runSequence());
        })
    }
}
