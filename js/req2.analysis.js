// Define a function to convert a JSON object representing a CSV table into a string
class CSVDefinedTreeNode {
    /**
     * constructor
     * @param {tuple} startPos
     * @param {string} selfValue
     * @param {dict} elements
     */
    constructor(startPos, selfValue, elements) {
        this.startRow = startPos[0];
        this.startCol = startPos[1];
        this.selfValue = selfValue;
        this.elements = elements;
        this.children = [];
        this.parent = null;
    }

    /**
     * getter for the number of children
     * @returns {int}
     */
    get countOfChildren() {
        return this.children.length;
    }

    /**
     * getter for the number of elements
     * @returns {int}
     */
    get countOfElements() {
        return this.elements.length;
    }

    /**
     * getter for the self value
     * @returns {string}
     */
    get myValue() {
        return this.selfValue;
    }

    /**
     * getter for the cell position
     * @returns {tuple}
     */
    get myPosition() {
        return [this.startRow, this.startCol];
    }

    /**
     * getter for the children
     * @returns {array}
     */
    get myChildren() {
        return this.children;
    }

    /**
     * getter for the elements
     * @returns {array}
     */
    get myElements() {
        return this.elements;
    }

    /**
     * getter for the parent
     * @returns {CSVDefinedTreeNode}
     */
    get myParent() {
        return this.parent;
    }

    /**
     * setter for the parent
     * @param {CSVDefinedTreeNode} parent
     */
    set myParent(parent) {
        this.parent = parent;
    }

    /**
     * method to add a child
     * @param {CSVDefinedTreeNode} child 
     */
    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    /**
     * method to add an element
     * @param {dict} element 
     */
    addElement(element) {
        this.elements.push(element);
    }

    /**
     * method to remove a child
     * @param {CsvDefinedTreeNode} child 
     */
    removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    /**
     * method to remove an element
     * @param {dict} element 
     */
    removeElement(element) {
        this.elements.splice(this.elements.indexOf(element), 1);
    }

    /**
     * method to check if the node is a leaf
     * @returns {boolean}
     */
    amIALeaf() {
        return this.countOfChildren === 0;
    }

    /**
     * method to check if the node is a root
     * @returns {boolean}
     */
    amIARoot() {
        return this.parent === null;
    }

    /**
     * method to export self as a JSON object
     * @returns {json}
     */ 
    toJson() {
        let childrenJson = [];
        for (let i = 0; i < this.countOfChildren; i++) {
            childrenJson.push(this.myChildren[i].toJson());
        }

        return {
            selfValue: this.selfValue,
            startRow: this.startRow,
            startCol: this.startCol,
            elements: this.elements,
            children: childrenJson
        };
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to convert an integer to its corresponding excel column name
 * @param {int} num 
 * @returns 
 */
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


/**
 * Define a function to convert a string representing a CSV table into a JSON object
 * @param {string} csvString
 * @returns 
 */
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


/**
 * 
 * @param {JSON} csvJson 
 * @returns 
 */
function compactedCsvJson(csvJson) {
    // First, we'll create a new empty object to store the compacted JSON data
    const compactedJson = {};

    // Next, we'll loop through each row in the original JSON data
    for (const [rowIndex, row] of Object.entries(csvJson)) {
        // For each row, we'll create a new empty object to store the compacted row data
        const compactedRow = {};

        // Then, we'll loop through each column in the row
        for (const [columnIndex, columnValue] of Object.entries(row)) {
            // If the column value is not empty, we'll add it to the compacted row object
            if (columnValue.trim() !== '') {
                compactedRow[columnIndex] = columnValue;
            }
        }

        // If the compacted row object is not empty, we'll add it to the compacted JSON object
        if (Object.keys(compactedRow).length > 0) {
            compactedJson[rowIndex] = compactedRow;
        }
    }

    // Finally, we'll return the compacted JSON object
    return compactedJson;
}
  

const csvString = "a,b,c,,e\nf,g,h,,j\nk,l,m,,o\np,q,r,,t\nu,v,w,,y\n,,,,\nz,1,2,,4\n5,6,7,,9\n0,!,@,,$\n%,^,&,,(";
const csvJson = csvToJson(csvString);

console.log(csvJson);

const compactedJson = compactedCsvJson(csvJson);
console.log(compactedJson);
