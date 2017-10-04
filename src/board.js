function Board (baseColor, rows, cols, dragon) {

    this.baseColor = baseColor;
    this.dragon = dragon;

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

    console.log('Creating game board...');
    let table = document.createElement("TABLE");
    let tr = null
    let td = null
    for (let i = 0; i < rows; i++) {
        tr = document.createElement("TR");
        for (let j = 0; j < cols; j++) {
            td = document.createElement("TD");
            td.style.background = baseColor;
            td.id = i + '_' + j
            if (i == 0 && j == 0) this.addDragon(td);
            tr.appendChild(td);
        }
        tr.appendChild(td);
        table.appendChild(tr);
    }
    document.body.appendChild(table);

}

module.exports = Board;