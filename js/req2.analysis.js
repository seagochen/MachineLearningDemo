

// Function to convert an integer to its corresponding excel column name
function convertToExcelColumnName(num) {
    let columnName = "";
    while (num > 0) {
        // Find the remainder when num is divided by 26
        let remainder = num % 26;
        // If the remainder is 0, we need to add 'Z' to the column name and decrement
        // num by 1, since 'Z' corresponds to the number 26 in excel column names
        if (remainder === 0) {
            columnName = "Z" + columnName;
            num = (num / 26) - 1;
        } else {
            // Otherwise, we can simply convert the remainder to a letter and add it
            // to the column name
            columnName = String.fromCharCode((remainder - 1) + "A".charCodeAt(0)) + columnName;
            num = Math.floor(num / 26);
        }
    }
    return columnName;
}


// Define a function to convert a string representing a CSV table into a JSON object
function csvToJson(csvString) {
    // Split the CSV string into an array of rows
    const rows = csvString.split(/\r?\n/);

    // Initialize an empty JSON object
    const json = {};

    // Iterate over the rows in the CSV table
    for (let i = 0; i < rows.length; i++) {
        // Split the current row into an array of columns
        const columns = rows[i].split(',');

        // Initialize an empty object to represent the current row in the JSON
        const rowJson = {};

        // Iterate over the columns in the current row
        for (let j = 0; j < columns.length; j++) {
            // Convert the current column index to its corresponding Excel column name
            const columnName = convertToExcelColumnName(j + 1);

            // Add the current column value to the JSON object representing the current row
            rowJson[columnName] = columns[j];
        }

        // Add the current row to the JSON object
        json[i + 1] = rowJson;
    }

    // Return the resulting JSON object
    return json;
}


/*


function groupRows(csvString) {
    // split the string by line
    var rows = csvString.split("\n");
    
    // convert each row to a JSON object and store them in an array
    var jsonRows = [];
    for (var i = 0; i < rows.length; i++) {
      jsonRows.push(csvToJson(rows[i]));
    }
    
    // create a variable to store the result
    var result = [];
    
    // iterate over the rows
    for (var i = 0; i < jsonRows.length; i++) {
      // check if the current row is a root row (has no empty cells)
      if (jsonRows[i].elements.A !== "" && jsonRows[i].elements.B !== "" && jsonRows[i].elements.C !== "" && jsonRows[i].elements.D !== "") {
        // add the current row to the result
        result.push(jsonRows[i]);
        
        // create a variable to store the child rows of the current root row
        var childRows = [];
        
        // iterate over the remaining rows
        for (var j = i + 1; j < jsonRows.length; j++) {
          // check if the current row is a child row of the current root row
          // (has more empty cells than the root row)
          if (jsonRows[j].elements.A === "" && jsonRows[j].elements.B === "" && jsonRows[j].elements.C === "" && jsonRows[j].elements.D === "") {
            // add the current row to the child rows of the current root row
            childRows.push(jsonRows[j]);
          }
        }
        
        // if the current root row has child rows, add them to the result
        if (childRows.length > 0) {
          result[result.length - 1].leaves = childRows;
        }
      }
    }
    
    // return the result
    return result;
  }
  
*/



// const csvString = "1,2,3,4,\n5,6,7,8,\n0,2,4,6,"
// const jsonObject = csvToJson(csvString);
// console.log(jsonObject)

// import other JS
class CSVDefinedTreeNode {
    // constructor
    constructor(startPos, selfValue, elements) {
        this.startRow = startPos[0];
        this.startCol = startPos[1];
        this.selfValue = selfValue;
        this.elements = elements;
        this.children = [];
        this.parent = null;
    }

    // getter for the number of children
    get countOfChildren() {
        return this.children.length;
    }

    // getter for the number of elements
    get countOfElements() {
        return this.elements.length;
    }

    // getter for the self value
    get myValue() {
        return this.selfValue;
    }

    // getter for the cell position
    get myPosition() {
        return [this.startRow, this.startCol];
    }

    // getter for the children
    get myChildren() {
        return this.children;
    }

    // getter for the elements
    get myElements() {
        return this.elements;
    }

    // getter for the parent
    get myParent() {
        return this.parent;
    }

    // setter for the parent
    set myParent(parent) {
        this.parent = parent;
    }

    // method to add a child
    addChild(child) {
        this.children.push(child);
    }

    // method to add an element
    addElement(element) {
        this.elements.push(element);
    }

    // method to remove a child
    removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    // method to remove an element
    removeElement(element) {
        this.elements.splice(this.elements.indexOf(element), 1);
    }

    // method to check if the node is a leaf
    amIALeaf() {
        return this.countOfChildren === 0;
    }

    // method to check if the node is a root
    amIARoot() {
        return this.parent === null;
    }

    // method to check if the node is a branch
    amIABranch() {
        return this.countOfChildren > 0;
    }

    // method to export self as a JSON object
    exportAsJSON() {
        return {
            startRow: this.startRow,
            startCol: this.startCol,
            selfValue: this.selfValue,
            elements: this.elements,
            children: this.children,
        };
    }
}

const csvTreeNode = new CSVDefinedTreeNode(['1', 'A'], 'hello world', {
  A: '',
  B: '',
  C: 'e1',
  D: 'f1',
  E: 'g1',
  F: '',
});

console.log(csvTreeNode.exportAsJSON());
