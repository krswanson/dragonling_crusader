let arrowkeys = require('arrowkeys');
let Board = require('./board.js');
let Dragon = require('./dragon.js');

let baseColor = 'green';
let mapping = {}
//mapping['orange'] = baseColor;
//mapping[baseColor] = 'orange';
mapping[baseColor] = 'brown';
mapping['brown'] = 'red';
mapping['red'] = 'orange';
mapping['orange'] = 'brown';
let dragon = new Dragon(mapping, 'orange');
let board = new Board(baseColor, 3, 3, dragon);

$(document).arrowkeys();

$(document)
    .on('upkey', function () {
    	board.moveDragon('up');
    })
    .on('downkey', function () {
        board.moveDragon('down');
    })
    .on('leftkey', function () {
    	board.moveDragon('left');
    })
    .on('rightkey', function () {
    	board.moveDragon('right');
    });
