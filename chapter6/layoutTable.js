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
    console.log(3);
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
            console.log(1)
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

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    console.log('heights is ' + heights);
    console.log('widths is ' + widths)

    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join(" ");
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
        // console.log(string);

        var block0Map = blocks[0].map(function(_, lineNo) {
            var blockString = drawLine(blocks, lineNo);
            // console.log('blockString: ' + blockString);
            return blockString;
        });
        block0Map = block0Map.join("\n");
        // console.log('block0Map: ' + block0Map);
        return block0Map;
    }

    var final = rows.map(drawRow).join("\n");
    // console.log('final \n' + final);
    return final;
    // return rows.map(drawRow).join("\n");
}


/*
Now creating the new cell type, the UnderlinedCell
*/
 function UnderlinedCell(inner) {
    this.inner = inner;
 };

UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
    console.log('2, ', this);
    return this.inner.minHeight() + 1;
};

UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1).
    concat([repeat("-", width)]);
};



// var rows = [];

// // var dimension = Number(prompt('Enter the dimension of the table'));

// for (var i = 0; i < dimension; i++) {
//     var row = [];
//     for (var j = 0; j < dimension; j++) {
//         if ((j + i) % 2 == 0)
//             row.push(new TextCell("##"));
//         else
//             row.push(new TextCell("__"));
//     }
//     rows.push(row);

// }

function dataTable(data) {
    var keys = Object.keys(data[0]);
    console.log("keys: " + keys);
    var headers = keys.map(function(name) {
        return new UnderlinedCell(new TextCell(name));
    });

    console.log(headers);

    console.log(data.length);

    var body = data.map(function(row) {
        return keys.map(function(name) {
            return new TextCell(String(row[name]));
        });
    });
    console.log([headers].concat(body));
    return [headers].concat(body);
}



var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

// console.log(rows)
console.log(drawTable(dataTable(MOUNTAINS)));
