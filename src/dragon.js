function Dragon (colors) {
    this.colors = colors;

    this.transformColor = function (color) {
        if (color === this.colors[0]) return this.colors[1];
        else return this.colors[0];
    }
}

module.exports = Dragon;