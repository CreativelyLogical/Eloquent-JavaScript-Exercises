console.log('hello world');

// Exercise: Retry

function primitiveMultiply(a, b) {
	var outcome = Math.floor(Math.random() * 2);

	if (outcome == 0)
		return a * b;
	else
		return -1;
}

function MultiplicatorUnitFailure(msg) {
	this.message = msg;
	this.stack = (new Error()).stack;
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";

function wrapper(a, b) {
	var result = primitiveMultiply.call(this, a, b);
	if (result == -1)
		throw new MultiplicatorUnitFailure("Cannot multiply input digits");
	else
		return result;
}


// Exercise: The Locked Box

var box = {
	locked: true,
	unlock: function() { this.locked = false;},
	lock: function() { this.locked = true; },
	_content: [],
	get content() {
		if (this.locked) throw new Error("Locked");
		return this._content;
	}
};

// Now we write a function that takes a function value as argument, then unlocks 
// the box, runs the function, and ensures that the box is locked again

function withBoxUnlocked(f) {
	try {
		box.unlock()
		f.call(this);
	} finally {
		box.lock();
	}

}

withBoxUnlocked(function() {
	box.content.push("gold piece");
})

console.log(box.locked);