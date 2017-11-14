// A dragon of a certain color with color mappings

function Dragon (mapping, color, type, startSquare=null) {
    this.mapping = mapping
    this.startSquare = startSquare || color
    this.color = color
    this.type = type
    this.image = "images/dragon_64px.png"

    this.transformColor = function (color) {
        return this.mapping[color];
    }
}

module.exports = Dragon;