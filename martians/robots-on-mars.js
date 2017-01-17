'use strict'

import {World} from './martians';

const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`

let Mars = new World(input.split('\n'));

Mars.plotRobots();
