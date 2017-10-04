// A dragon of a certain color with color mappings

function Dragon (mapping, color, startSquare=null) {
    this.mapping = mapping;
    this.startSquare = startSquare || color;
    this.color = color;

    this.transformColor = function (color) {
        return this.mapping[color];
    }
}

module.exports = Dragon;