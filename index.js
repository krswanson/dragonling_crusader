function Board (baseColor, rows, cols) {
    this.baseColor = 'white';
}

let board = new Board('white', 3, 3);

function transformColor(color) {
    if (color === 'orange') return board.baseColor;
    else return 'orange';
}

function addDragon (id) {
    let td = $(id)[0];
    if (!td) return false;
    td.innerHTML = '<img src="dragon 64px.png">';
    td.style.padding ='6px 6px 6px 6px';
    td.style.background = transformColor(td.style.background);
    $(id).addClass('dragon current');
    return true;
}
function removeDragon (id) {
    console.log('id', id);
    let td = $(id)[0];
    console.log('td', td);
    if (!td) return false;
    td.innerHTML = '';
    td.style.padding ='40px 40px 40px 40px';
    $(id).removeClass('dragon current');
    return true;
}
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
    if (newId && addDragon(newId)) removeDragon('#' + currentId);
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
