// console.log("hello world");

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

function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function(vector) {
	return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.toString = function() {
	var vectorString = '(' + this.x + ', ' + this.y + ')';
	return vectorString;
};

function randomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

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

var directionNames = "n ne e se s sw w nw".split(" ");


function elementFromChar(legend, ch) {
	if (ch == " ")
		return null // We use null to represent spaces
	var element = new legend[ch]();
	element.originChar = ch; // We'll need this originChar property when implementing the toString method
	// console.log(element);
	return element;
}

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
	for (var dir in directions) {
		if (this.look(dir) == ch)
			found.push(dir);
	}
	return found;
};

View.prototype.find = function(ch) {
	var found = this.findAll(ch);
	if (found.length == 0) return null;
	return randomElement(found);
};

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

// This is to check if the destination is valid
World.prototype.checkDestination = function(action, vector) {
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction]); // The destination is the current vector plus the vector of the direction
		if (this.grid.isInside(dest)) // Check if the destination vector IS inside the grid (is it VALID?)
			return dest;
	}
};


World.prototype.turn = function() {
	var acted = [];
	console.log(this);
	this.grid.forEach(function(critter, vector) {
		if (critter.act && acted.indexOf(critter) == -1) {
			acted.push(critter);
			this.letAct(critter, vector);
		}
	}, this);
};

// Now we create the LifelikeWorld object, which is "based" on the World object

function LifelikeWorld(map, legend) {
	World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector)); // The action object returned from the critters calling their respective "act" methods
	var handled = action && // if action exists (is it NOT null?)
		action.type in actionTypes && // If the "type" of the action is in the actionTypes object 
		actionTypes[action.type].call(this, critter, vector, action); // Calling the appropriate handler function in the actionTypes object

	if (!handled) {
		critter.energy -= 0.2;
		if (critter.energy <= 0)
			this.grid.set(vector, null);
	}

	actionTypes.grow = function(critter) {
		critter.energy += 0.5;
		return true;
	};

	actionTypes.move = function(critter, vector, action) {
		var dest = this.checkDestination(action, vector, action);
		// Conditions in which the move cannot be executed
		if (dest == null || // The destination does not exist
			critter.energy <= 1 || // The critter does not have enough energy to move
			this.grid.get(dest) != null) // The destination is NOT an empty space
			return false;

		critter.energy -= 1;
		this.grid.set(vector, null);
		this.grid.set(dest, critter);
		return true;
	};


	actionTypes.eat = function(critter, vector, action) {
		var dest = this.checkDestination(action, vector);
		var atDest = dest != null && this.grid.get(dest);
		if (!atDest || atDest.energy == null)
			return false;
		critter.energy += atDest.energy;
		this.grid.set(dest, null);
		return true;
	};

	actionTypes.reproduce = function(critter, vector, action) {
		var baby = elementFromChar(this.legend,
								   critter.originChar);
		var dest = this.checkDestination(action, vector);
		if (dest == null ||
			critter.energy <= 2 * baby.energy ||
			this.grid.get(dest) != null)
			return false;
		critter.energy -= 2 * baby.energy;
		this.grid.set(dest, baby);
		return true;
	};
};



// Now we begin defining the different types of critters

function Plant() {
	this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function(context) {
	if (this.energy > 15) {
		var space = context.find(" ");
		if (space)
			return {type: "reproduce", direction: space};
	}
	if (this.energy < 20)
		return {type: "grow"};
};

function PlantEater() {
	this.energy = 20;
}

PlantEater.prototype.act = function(context) {
	var space = context.find(" ");
	if (this.energy > 60 && space)
		return {type: "reproduce", direction: space};
	var plant = context.find("*");
	if (plant)
		return {type: "eat", direction: plant};
	if (space)
		return {type: "move", direction: space};
};