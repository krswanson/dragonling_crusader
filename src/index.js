const arrowkeys = require('arrowkeys')
const board = require('./board.js')
let Dragon = require('./dragon.js')


const levels = {}
levels['fire_1'] = {
    "baseColor": "green",
    "color": "orange",
    "type": "fire",
    "mapping": {
        "green": "orange",
        "orange": "green"
    }
}
levels['fire_2'] = {
    "baseColor": "green",
    "color": "orange",
    "type": "fire",
    "mapping": {
        "green": "brown",
        "brown": "orange",
        "orange": "brown"
    }
}


$(document).on("change","select",function(){
  $("option[value=" + this.value + "]", this)
  .attr("selected", true).siblings()
  .removeAttr("selected")
});

let selectLevel = function () {
    board.delete()
    let level = levels[$('#level_select')[0].value]
    dragon = new Dragon(level.mapping, level.color);
    board.setup(level.baseColor, 3, 4, dragon);

}
document.getElementById('level_button').addEventListener('click', selectLevel);

let dragon = new Dragon(levels['fire_1'].mapping, levels['fire_1'].color);
board.setup(levels['fire_1'].baseColor, 1, 2, dragon);
