import {Coord} from '../martians';

describe('Coord Class', function() {
    let inputs, outputs;

    beforeEach(function() {
        inputs = ['1 1 E', '3 2 N', '0 3 W'];
    });

    it('Instantiates with expected properties', function() {
        outputs = [{
            'x': 1,
            'y': 1,
            'dir': 90
        },
        {
            'x': 3,
            'y': 2,
            'dir': 0
        },
        {
            'x': 0,
            'y': 3,
            'dir': 270
        }];
        inputs.forEach(function(c, i) {
            let coord = new Coord(c);
            expect(coord.x).toBe(outputs[i].x);
            expect(coord.y).toBe(outputs[i].y);
            expect(coord.dir).toBe(outputs[i].dir);
        });
    });

    it('Converts direction to the expected string representation', function() {
        outputs = ['E', 'N', 'W'];
        inputs.forEach(function(c, i) {
            let coord = new Coord(c);
            expect(coord.convertNumber(coord.dir)).toBe(outputs[i]);
        });
    });

    it('renders the final output as expected', function() {
        outputs = ['1 1 E', '3 2 N', '0 3 W'];
        inputs.forEach(function(c, i) {
            let coord = new Coord(c);
            expect(coord.render()).toBe(outputs[i]);
        });
    });
});
