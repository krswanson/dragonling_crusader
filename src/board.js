function Board (baseColor, rows, cols, dragon, goal=null) {

    this.baseColor = baseColor;
    this.rows = rows;
    this.cols = cols;
    this.dragon = dragon;
    this.goal = goal || dragon.color;

    this.hasWon = function () {
    	for (let i = 0; i < this.rows; i++) {
        	for (let j = 0; j < this.cols; j++) {
            	let color = $('#' + i + '_' + j)[0].style.background;
            	if (color !== this.goal) return false;
    		}
    	}
    	console.log('Won...');
    	for (let i = 0; i < this.rows; i++) {
        	for (let j = 0; j < this.cols; j++) {
            	$('#' + i + '_' + j).addClass('flash');
            }
        }
        console.log('about to');
        document.getElementById("you-won").style.display = 'block';
        console.log('did it');
    	return true;
    }

    this.addDragon = function (id) {
        let td = $(id)[0];
        if (!td) return false;
        console.log('image...');
        td.innerHTML = '<img src="images/dragon_64px.png">';
        td.style.padding ='6px 6px 6px 6px';
        console.log('dragon', dragon);
		td.style.background = this.dragon.transformColor(td.style.background);
        $(id).addClass('dragon current');
        return true;
    }
    this.removeDragon = function (id) {
        console.log('id', id);
        let td = $(id)[0];
        console.log('td', td);
        if (!td) return false;
        td.innerHTML = '';
        td.style.padding ='40px 40px 40px 40px';
        $(id).removeClass('dragon current');
        return true;
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

	this.setup = function () {
		let goalDiv = $('#objective-color')[0];
	    goalDiv.innerHTML = this.goal;
	    goalDiv.style.color = this.goal;
	    console.log('Creating game board...');
	    let table = document.createElement("TABLE");
	    let tr = null
	    let td = null
	    for (let i = 0; i < this.rows; i++) {
	        tr = document.createElement("TR");
	        for (let j = 0; j < this.cols; j++) {
	            td = document.createElement("TD");
	            td.style.background = baseColor;
	            td.id = i + '_' + j
	            if (i == 0 && j == 0) {
	            	this.addDragon(td);
	            	td.style.background = this.dragon.startSquare;
	            }
	            tr.appendChild(td);
	        }
	        tr.appendChild(td);
	        table.appendChild(tr);
	    }
	    document.body.appendChild(table);
	}
	this.setup();
}

module.exports = Board;