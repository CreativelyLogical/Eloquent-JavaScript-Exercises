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


/*
Exercise: Another Cell
Goal: Implement a cell type named StrechCell(inner, width, height) that conforms to the 
table cell interface described earlier in the chapter. It should wrap another cell (like
UnderlineCell does) and ensure that the resulting cell has AT LEAST the given width and height,
even if the inner cell would naturally be smaller.
*/

function TextCell(text) {
    this.text = text.split("\n");
}

// Setting up the methods of the TextCell constructor's prototype property,
// which in turn allows all instances of TextCell to have access to the methods
TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
        return Math.max(width, line.length);
    }, 0);
};


TextCell.prototype.minHeight = function() {
    // console.log(3);
    return this.text.length;
}


TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        // console.log('this.text is ' + this.text);
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};


function StretchCell(inner, width, height) {
  this.inner = inner;
  var widthDifference = width - inner.text[0].length;
  this.inner.text[0] += repeat(" ", widthDifference);
}

StretchCell.prototype.minWidth = function() {
  console.log('this.inner is', this.inner);
  return this.inner.minWidth();
};

StretchCell.prototype.minHeight = function() {
  return this.inner.minHeight();
}

StretchCell.prototype.draw = function(width, height) {
  // body...
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

var data = [
  [new TextCell('Hello'), new TextCell("Darkness"), new TextCell('My Old Friend')],
  [new TextCell("I've come"), new TextCell('to talk with'), new TextCell('you again')],
  [new TextCell('I dont'), new TextCell('hollahoop'), new TextCell('You know man')],
];


function repeat(string, times) {
    
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

function rowHeight(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidth(rows) {
  return rows[0].map(function(_, idx) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[idx].minWidth());
    }, 0)
  })
}


function drawTable(rows) {
  var widths = colWidth(rows);
  var heights = rowHeight(rows);
  

  function drawLine(blocks) {
    return blocks.map(function(block) {
      return block[0];
    }).join(" ");
  }


  function drawRow(row, rowIndex) {
    var blocks = row.map(function(cell, cellIndex) {
      return cell.draw(widths[cellIndex], heights[rowIndex]);
    });

    var blockString = blocks[0].map(function(_) {
      return drawLine(blocks);
    });

    return blockString;
  }


  return rows.map(drawRow).join("\n");
}



