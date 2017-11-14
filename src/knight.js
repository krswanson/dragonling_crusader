function Knight (startSquare) {
    this.frequency = 5000 // Moves once per how many seconds
    this.image = "images/helmet_64px.png"
	var myInterval = 0;

let move = function ()
{
    console.log('moving!')
}
// STARTS and Resets the loop if any
this.moveNext = function () {
    if (myInterval > 0) clearInterval(myInterval);  // stop
    myInterval = setInterval( function () {move()}, this.frequency);  // run
}
}

module.exports = Knight;