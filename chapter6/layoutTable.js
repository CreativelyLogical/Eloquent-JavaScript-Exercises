console.log('hello world');

// Setting up the TextCell constructor
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
    return this.text.length;
}


TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        console.log('this.text is ' + this.text);
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};


// Setting up other functions (NOT methods) that are instrumental
// to the functionality of our program
function repeat(string, times) {
    
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            // console.log(cell);
            return Math.max(max, cell.minHeight());
        }, 0)
    });
}

function colWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(row) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    console.log('heights is ' + heights);
    console.log('widths is ' + widths)

    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join("");
    }

    function drawRow(row, rowNum) {
        var blocks = row.map(function(cell, colNum) {
            var drawCell = cell.draw(widths[colNum], heights[rowNum]);
            console.log('drawCell: ' + drawCell);
            return drawCell;
        });
        console.log('blocks:');
        var string = '';
        for (var i = 0; i < blocks.length; i++) {
            string += blocks[i];
        }
        console.log(string);

        var block0Map = blocks[0].map(function(_, lineNo) {
            var blockString = drawLine(blocks, lineNo);
            console.log('blockString: ' + blockString);
            return blockString;
        });
        block0Map = block0Map.join("\n");
        console.log('block0Map: ' + block0Map);
        return block0Map;
    }

    var final = rows.map(drawRow).join("\n");
    console.log('final \n' + final);
    return final;
    // return rows.map(drawRow).join("\n");
}

var rows = [];

var dimension = 3

for (var i = 0; i < dimension; i++) {
    var row = [];
    for (var j = 0; j < dimension; j++) {
        if ((j + i) % 2 == 0)
            row.push(new TextCell("##"));
        else
            row.push(new TextCell("__"));
    }
    rows.push(row);

}
// console.log(rows)
console.log(drawTable(rows));
