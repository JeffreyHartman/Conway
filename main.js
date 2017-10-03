var GameOfLife = {
	canvas : document.getElementById("canvas"),
	ctx : null,
 	boardWidth : 64,
 	boardHeight : 64,
 	cellHeight : 8,
 	cellWidth : 8,
 	borderThickness : 1,
 	cells : [],

	

	init : function() {
		this.ctx = canvas.getContext("2d")
		this.ctx.canvas.width = this.boardWidth * this.cellWidth;
		this.ctx.canvas.height = this.boardHeight * this.cellHeight;	

		//initialize cells arrays
		for (var x = 0;x <= this.boardWidth-1;x++) {
			this.cells.push( [] );
			for (var y = 0;y <= this.boardHeight-1;y++) {	
				this.cells[x].push(0);
			}
		}
		// test
		this.cells[15][15] = 1;
		this.cells[15][16] = 1;
		this.cells[15][17] = 1;
		this.drawBoard(this.cells, this.boardWidth, this.boardHeight, this.cellWidth, this.cellHeight, this.borderThickness);
	},

	nextStepClick : function() {
		var next_gen = this.performNextGen(this.cells);
		this.drawBoard(next_gen, this.boardWidth, this.boardHeight, this.cellWidth, this.cellHeight, this.borderThickness);
		this.cells = next_gen.slice();
	},

	performNextGen : function(current_gen) {
		var new_state,
			liveNeighbors,
			next_gen = [];

		for (var x = 0;x <= this.boardWidth-1;x++) {
			next_gen[x] = []; // init new row
			for (var y = 0;y <= this.boardHeight-1;y++) {
				liveNeighbors = 0; // initialize live neighbors count
				new_state = current_gen[x][y]; //remember current state for if unchanged
				for (var dx = -1; dx <= 1; dx++){
					for (var dy = -1;dy <= 1;dy++) {									
						if (x+dx <= this.boardWidth-1 && y+dy <= this.boardHeight-1 &&
									x+dx >= 0 && y+dy >= 0 && (dx != 0 || dy != 0)) {
							liveNeighbors += current_gen[x+dx][y+dy];
						}				
					}
				}

				if (current_gen[x][y] == 1) {
					if (liveNeighbors < 2 || liveNeighbors > 3) {
						new_state = 0;			
					}
				} else {
					if (liveNeighbors == 3)  {
						new_state = 1;			
					}
				}
				next_gen[x][y] = new_state;
			}
		}	
		return next_gen;		
	},

	drawBoard : function(next_gen, boardWidth, boardHeight, cellWidth, cellHeight, borderThickness) {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		for (var x = 0;x <= boardWidth-1;x++) {
			for (var y = 0;y <= boardHeight-1;y++) {
				// draw border
				this.ctx.fillStyle = 'grey';
				this.ctx.fillRect(x*cellWidth - borderThickness, y*cellHeight - borderThickness, cellWidth + (borderThickness * 2), cellHeight + (borderThickness * 2));

				if (next_gen[x][y] == 1) {
					// draw border					
					this.ctx.fillStyle = 'black';
					this.ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
				} else {
					this.ctx.fillStyle = 'white';
					this.ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
				}
			}
		}
	}


};

