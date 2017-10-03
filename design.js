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
*/