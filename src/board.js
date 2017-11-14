const rgbHex = require('rgb-hex')

function Board () {

	self = this
	self.baseColor = null
	self.rows = null
	self.cols = null
	self.dragon = null
	self.goal = null
	self.goalName = null


    this.hasWon = function () {
    	for (let i = 0; i < self.rows; i++) {
        	for (let j = 0; j < self.cols; j++) {
            	let color = $('#' + i + '_' + j)[0].style.background
            	if (color.includes('rgb')) color = '#' + rgbHex(color)
            	if (color !== self.goal) return false
    		}
    	}
    	for (let i = 0; i < self.rows; i++) {
        	for (let j = 0; j < self.cols; j++) {
            	$('#' + i + '_' + j).addClass('flash')
            }
        }
        $("#you-won")[0].style.display = 'block'
    	return true
    }

    this.addDragon = function (id) {
        let td = $(id)[0]
        if (!td) return false
        td.innerHTML = '<img src="' + self.dragon.image + '">'
        td.style.padding ='6px 6px 6px 6px'
        td.style.background = self.dragon.transformColor(td.style.background)
        $(id).addClass('dragon current')
        return true
    }
    this.removeDragon = function (id) {
        let td = $(id)[0]
        if (!td) return false
        td.innerHTML = ''
        td.style.padding ='40px 40px 40px 40px'
        $(id).removeClass('dragon current')
        return true
    }

    this.moveDragon = function (direction) {
    	let currentId = $('.current')[0].id;
	    let rowCol = currentId.split('_');
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
	    if (newId && this.addDragon(newId)) {
	        this.removeDragon('#' + currentId);
	        if (this.hasWon()) $(document).arrowkeysUnbind();
	    }
	}

	this.setup = function (baseColor, rows, cols, dragon, goal=null) {			
		$(document).arrowkeys()
		self.baseColor = baseColor
		self.rows = rows
		self.cols = cols
		self.dragon = dragon
		self.goal = (goal || dragon.color).toLowerCase()

        let goalDiv = $('#objective-color')[0]
        goalDiv.innerHTML = dragon.type
	    goalDiv.style.color = self.goal
        let table = document.createElement("TABLE")
        table.id = 'dragon_board'
        let tr = null
        let td = null
	    for (let i = 0; i < self.rows; i++) {
	        tr = document.createElement("TR")
	        for (let j = 0; j < self.cols; j++) {
	            td = document.createElement("TD")
	            td.style.background = self.baseColor
	            td.id = i + '_' + j
	            if (i == 0 && j == 0) {
	            	this.addDragon(td)
	            	td.style.background = self.dragon.startSquare
	            }
	            tr.appendChild(td)
	        }
	        tr.appendChild(td)
	        table.appendChild(tr)
	    }
	    document.getElementById('board').appendChild(table)
	}

	this.delete = function () {
		$('#dragon_board').remove()
		$("#you-won")[0].style.display = 'none'
		$(document).arrowkeysUnbind()
	}
}

const board = new Board()

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

module.exports = board;