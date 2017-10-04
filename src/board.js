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

module.exports = Board;