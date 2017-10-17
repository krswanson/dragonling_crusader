/^
Table dimentions
Player(s) start
Table starting color
Table ending color
Holes

Table
	array
		Square
	endingColor
	allEndingColor
		check all non-holes
	getSquare(dir, square)
		offBoard(row, col) bool
		return square or null

Square
	color
	isHole
	piece

Piece
	image
	currentSquare
	move
		get new square
		check edge (null)
		check hole
		check hitPiece
		get transformColor
		animateMove
	transformColor (required method)
	reactionToHoles
	hitPiece
		reaction to AI or player piece

Dragon
	Its color
	Color transforms (table to self, self to table; this color to that color)
		grass -> dirt -> coals -> fire -> dirt -> coals -> fire
		fire hits
			case grase -> dirt
			case dirt -> coals
			case coals -> fire
			case fire -> dirt
		dirt <-> fire / dirt <-> ice / fire -> dirt -> water <-> ice
			fire hits
				case dirt -> fire
				case fire -> dirt
				case ice -> water
				case water -> dirt
				case fire -> dirt
			ice hits
				case dirt -> ice
				case fire -> water
				case ice -> dirt
				case water -> ice
				case fire -> water 

createTable
	for each in array
		createSquare(row_col, color, image)
(later) createInfo
setSquare(id, color, image) (defaults for border: color px)
	find id or create with id
	setImage
	set style
	return td
setImage(square, image or null)
	insert/remove image
	modify padding based on image size
waitForMoveEvent
	piece.move
animateMove(fromSquare, toSquare, image, toColor)
	updte fromSquare in table
		remove image -> setImage(square, null)
		re-add object to table?
	update toSqure in table
		change color
		add image
		re-add object to table?
gameWon
gameLost

AI
	Pause (max, rand formula)
	Random direction

// X Better "you win" message, modify board style?
// Be able to select levels, game file includes fire/ice files
// Dragon image with filled color?
// Mark game files as won or never won
// With two dragons, buttons to change, mark dragon using transparancy change?
// Be able to create levels
// Holes in board...
*/