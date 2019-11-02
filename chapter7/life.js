var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];



function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.toString = function() {
	var vectorString = '(' + this.x + ', ' + this.y + ')';
	return vectorString;
};

function Grid(width, height) {
	this.space = new Array(width * height);
	this.width = width;
	this.height = height;
}

Grid.prototype.isInside = function(vector) {
	return vector.x >= 0 && vector.x < this.width &&
		   vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector) {
	return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
	this.space[vector.x + this.width * vector.y] = value;
};

var directions = {
    "n":  new Vector( 0, -1),
    "ne": new Vector( 1, -1),
    "e":  new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s":  new Vector( 0,  1),
    "sw": new Vector(-1,  1),
    "w":  new Vector(-1,  0),
    "nw": new Vector(-1, -1)
};

function randomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");


// This is the object representing the critters
function BouncingCritter() {
	this.direction = randomElement(directionNames);
}


BouncingCritter.prototype.act = function(view) {
	if (view.look(this.direction) != " ")
		this.direction = view.find(" ") || "s";
	// Here we see the act method returning an action object, which has a type property
	return {type: "move", direction: this.direction};
};

// Now we start talking about the World object

function elementFromChar(legend, ch) {
	if (ch == " ")
		return null // We use null to represent spaces
	var element = new legend[ch]();
	element.originChar = ch; // We'll need this originChar property when implementing the toString method
	// console.log(element);
	return element;
}


function World(map, legend) {
	var grid = new Grid(map[0].length, map.length);

	this.grid = grid;
	this.legend = legend;

	map.forEach(function(line, y) {
		console.log(line);
		for (var x = 0; x < line.length; x++) {
			// console.log('wtf');
			grid.set(new Vector(x, y),
					 elementFromChar(legend, line[x]));
		}
	});
	// console.log(grid);
	// console.log(this.grid);
}

function charFromElement(element) {
	if (element == null)
		return " ";
	else
		return element.originChar;
}

function Wall() {}

function WallFollower() {
	this.dir = "s";
}

function dirPlus(dir, n) {
	var index = directionNames.indexOf(dir);
	return directionNames[(index + n + 8) % 8];
}

WallFollower.prototype.act = function(view) {
	var start = this.dir; // its starting direction is south ("s")
	if (view.look(dirPlus(this.dir, -3)) != " ")
		start = this.dir = dirPlus(this.dir, -2);
	while (view.look(this.dir) != " ") {
		this.dir = dirPlus(this.dir, 1);
		if (this.dir == start) break;
	}
	return {type: "move", direction: this.dir};
};

World.prototype.toString = function() {
	var output = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width; x++) {
			var element = this.grid.get(new Vector(x, y));
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
};

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
//	 ############################
//   #      #    #      o      ##
//   #                          #
//   #          #####           #
//   ##         #   #    ##     #
//   ###           ##     #     #
//   #           ###      #     #
//   #   ####                   #
//   #   ##       o             #
//   # o  #         o       ### #
//   #    #                     #
//   ############################


Grid.prototype.forEach = function(f, context) {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var value = this.space[x + y * this.width];
			if (value != null) {
				f.call(context, value, new Vector(x, y));
			}
		}
	}
};


World.prototype.turn = function() {
	var acted = [];
	// console.log("this.grid is ", this.grid);
	this.grid.forEach(function(critter, vector) {
		if (critter.act && acted.indexOf(critter) == -1) {
			acted.push(critter);
			// console.log('critter is ' + critter + ' and vector is ' + vector.toString());
			this.letAct(critter, vector); // The method that's responsible for the actual logic of turning the critters
		}
	}, this);
};

World.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector));
	if (action && action.type == "move") {
		var dest = this.checkDestination(action, vector);
		if (dest && this.grid.get(dest) == null) {
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}
};

World.prototype.checkDestination = function(action, vector) {
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction]);
		if (this.grid.isInside(dest)) {
			return dest;
		}
	}
};

function View(world, vector) {
	this.world = world;
	this.vector = vector;
}

View.prototype.look = function(dir) {
	var target = this.vector.plus(directions[dir]);
	if (this.world.grid.isInside(target))
		return charFromElement(this.world.grid.get(target));
	else
		return "#";
};

View.prototype.findAll = function(ch) {
	var found = [];
	for (var dir in directions)
		if (this.look(dir) == ch)
			found.push(dir)
	return found;
};

View.prototype.find = function(ch) {
	var found = this.findAll(ch);
	if (found.length == 0) return null;
	return randomElement(found);
};