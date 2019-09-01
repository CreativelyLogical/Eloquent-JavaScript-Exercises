/*
Exercise: A Vector Type
Goal: Create a constructor vector that represents a vector in 
      2D space, taking x and y parameters. 
      Give the prototype property of Vector 2 methods, 'plus' and 'minus',
      which returns a new vector that has the sum of difference of the 2 
      vectors.
      Also add a getter property 'length' to the prototype that computes the 
      length of the vector. That is, the distance of the point (x, y) from the origin (0, 0).
*/

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(inputVector) {
    return new Vector(this.x + inputVector.x, this.y + inputVector.y);
}

Vector.prototype.minus = function(inputVector) {
    return new Vector(this.x - inputVector.x, this.y - inputVector.y);
}

Vector.prototype.setX = function(x) {
    this.x = x;
}

Vector.prototype.setY = function(y) {
    this.y = y;
}

Object.defineProperty(Vector.prototype, "length", {
    get: function() {
        var xDistance = Math.pow(this.x - 0, 2);
        var yDistance = Math.pow(this.y - 0, 2);
        return Math.sqrt(xDistance + yDistance);        
    }
});