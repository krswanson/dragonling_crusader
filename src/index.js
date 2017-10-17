const arrowkeys = require('arrowkeys')
let Board = require('./board.js')
let Dragon = require('./dragon.js')

let selectLevel = function () {
    board.delete()
    dragon = new Dragon(fire_2.mapping, fire_2.color);
    board = new Board(fire_2.baseColor, 3, 4, dragon);

}
document.getElementById('level_button').addEventListener('click', selectLevel);
// Have constants and set a variable to one given the form data on a button click

const fire_1 = {
    "baseColor": "green",
    "color": "orange",
    "type": "fire",
    "mapping": {
        "green": "orange",
        "orange": "green"
    }
}
const fire_2 = {
    "baseColor": "green",
    "color": "orange",
    "type": "fire",
    "mapping": {
        "green": "brown",
        "brown": "orange",
        "orange": "brown"
    }
}

let dragon = new Dragon(fire_1.mapping, fire_1.color);
let board = new Board(fire_1.baseColor, 1, 2, dragon);

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
