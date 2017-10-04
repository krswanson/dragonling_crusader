const arrowkeys = require('arrowkeys');
let Board = require('./board.js');
let Dragon = require('./dragon.js');

let baseColor = 'green';
let dragon = new Dragon(['orange', baseColor]);
let board = new Board(baseColor, 5, 4, dragon);

function moveCurrent (direction) {
    let currentId = $('.current')[0].id;
    let rowCol = currentId.split('_');
    console.log("rowCol", rowCol);
    let newId = null;
    switch (direction) {
        case 'up':
            newId = '#' + (parseInt(rowCol[0]) - 1) + '_' + rowCol[1];
            break;
        case 'down':
            newId = '#' + (parseInt(rowCol[0]) + 1) + '_' + rowCol[1];
            break;
        case 'left':
            newId = '#' + rowCol[0] + '_' + (parseInt(rowCol[1]) - 1);
            break;
        case 'right':
            newId = '#' + rowCol[0] + '_' + (parseInt(rowCol[1]) + 1);
            break;
        default:
            throw new Error('Dad direction keyword:', direction);
    }
    console.log('newId', newId);
    if (newId && board.addDragon(newId)) board.removeDragon('#' + currentId);
}


$(document).ready(function() {

$(document).arrowkeys();

$(document)
    .on('upkey', function () {
    	console.log('up');
        moveCurrent('up');
    })
    .on('downkey', function () {
        console.log('down');
        moveCurrent('down');
    })
    .on('leftkey', function () {
    	console.log('left');
        moveCurrent('left');
    })
    .on('rightkey', function () {
    	console.log('right');
        moveCurrent('right');
    });

});
