import {World} from '../martians';

describe('World Class', function() {
    var input, W;

    beforeAll(function() {
        input = `5 3

                 1 1 E
                 RFRFRFRF`;
        W = new World(input.split('\n'));
    });

    it('Instantiates with expected properties', function() {
        expect(W.coords.x).toBe(5);
        expect(W.coords.y).toBe(3);
        expect(W.martians.length).toBe(1);
    });
});
