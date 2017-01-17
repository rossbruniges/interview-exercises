import {Coord, Martian} from '../martians';

describe('Martian Class', function(){
    let M;

    beforeEach(function() {
        M = new Martian('0 0 N', '', new Coord('5 3'));
    });

    describe('Has an accurate spin method', function() {
        it('is able to rotate to the left', function() {
            M.spin('L');
            expect(M.location.dir).toBe(270);
        });
        it('is able to rotate to the right', function() {
            M.spin('R');
            expect(M.location.dir).toBe(90);
        });
        it('is able to spin in a full circle to the left', function() {
            let inputs = ['L', 'L', 'L', 'L'];
            let outputs = [270, 180, 90, 0];
            inputs.forEach(function(c, i) {
                M.spin(c);
                expect(M.location.dir).toBe(outputs[i]);
            });
        });
        it('is able to spin in a full circle to the right', function() {
            let inputs = ['R', 'R', 'R', 'R'];
            let outputs = [90, 180, 270, 0];
            inputs.forEach(function(c, i) {
                M.spin(c);
                expect(M.location.dir).toBe(outputs[i]);
            });
        });
    });

    describe('Has an accurate proceed method', function() {
        it('can move to all compass points', function() {
            let directions = [0, 90, 180, 270];
            let outputs = [{
                'x': 0,
                'y': 1
            },
            {
                'x': 1,
                'y': 1
            },
            {
                'x': 1,
                'y': 0
            },
            {
                'x': 0,
                'y': 0
            }];
            directions.forEach(function(c, i) {
                M.proceed();
                expect(M.location.x).toBe(outputs[i].x);
                expect(M.location.y).toBe(outputs[i].y);
                M.spin('R');
            });
        })
    });
});
