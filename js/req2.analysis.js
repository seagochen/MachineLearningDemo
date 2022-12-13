// Define a function to convert a JSON object representing a CSV table into a string
class CSVDefinedTreeNode {
    /**
     * constructor
     * @param {string} startRow
     * @param {string} startCol
     * @param {JSON} elements
     */
    constructor(startRow, startCol, elements) {
        this.startRow = startRow;
        this.startCol = startCol;
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
     * getter for the cell position
     * @returns {string[]}
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
     * @returns {JSON}
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
     * @param {JSON} element
     */
    addElement(element) {
        this.elements.push(element);
    }

    /**
     * method to remove a child
     * @param {CSVDefinedTreeNode} child
     */
    removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    /**
     * method to remove an element
     * @param {JSON} element
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
 * This function will delete the empty rows and columns in the csvJson
 * @param {JSON} csvJson
 * @returns 
 */
function finedCsvJson(csvJson) {

    // Use a dictionary to store which columns are empty
    const emptyColumns = {};
    const emptyRows = [];

    // Iterate over the rows in the csvJson
    for (let i = 1; i <= Object.keys(csvJson).length; i++) {

        // The count of empty columns in the current row
        let emptyColumnCount = 0;

        // Iterate over the columns in the current row
        for (let j = 1; j <= Object.keys(csvJson[i]).length; j++) {

            // If the current column is empty, add it to the emptyColumns dictionary
            if (csvJson[i][convertToExcelColumnName(j)] === "") {

                // If emptyColumns does not have a key for the current column, add it
                if (emptyColumns[convertToExcelColumnName(j)] === undefined) {
                    emptyColumns[convertToExcelColumnName(j)] = 1;
                } else {
                    // Otherwise, increment the value of the key
                    emptyColumns[convertToExcelColumnName(j)] += 1;
                }

                // Increment the count of empty columns in the current row
                emptyColumnCount += 1;
            }
        }

        // If the current row is empty, add it to the emptyRows array
        if (emptyColumnCount === Object.keys(csvJson[i]).length) {
            emptyRows.push(i);
        }
    }

    // How many rows are in the csvJson?
    const numberOfRows = Object.keys(csvJson).length;

    // Create a new JSON object to store the cleaned csvJson
    const finedCsvJson = {};

    // Now copy the elements from the original csvJson to the new finedCsvJson
    for (let i = 1; i <= Object.keys(csvJson).length; i++) {

        // Skip the row if it is empty
        if (emptyRows.includes(i)) {
            continue;
        }

        for (let j = 1; j <= Object.keys(csvJson[i]).length; j++) {

            // Skip the column if it is empty
            if (emptyColumns[convertToExcelColumnName(j)] === numberOfRows) {
                continue;
            }

            // If the current row is undefined, initialize it
            if (finedCsvJson[i] === undefined) {
                finedCsvJson[i] = {};
            }

            // Copy the rest of the elements into the new finedCsvJson
            finedCsvJson[i][convertToExcelColumnName(j)] = csvJson[i][convertToExcelColumnName(j)];
        }
    }

    return finedCsvJson;
}


/**
 * Check the stack to see if some elements are probably consisted of a tree
 * @param {Array} stack 
 * @returns
 */
function updateTreeStack(stack) {
    // Start from the last element of the stack then forward.
    // If the startRow of the node is bigger than the previous one, 
    // it means that the current node is a child node of the previous one.

    // Top element in stack
    const anchor = stack[stack.length - 1];

    // Iterate over the stack from the second last element to the first element
    for (let i = stack.length - 2; i >= 0; i--) {
        // If the startRow of the current node is bigger than the previous one,
        // it means that the current node is a child node of the previous one.

        // TODO
    }

    return stack;
}


/**
 * This function will generate a tree from the Json object
 * @param {JSON} finedJson 
 * @returns
 */
function genJsonTree(finedJson) {
    // Use a list to perform a stack operation
    let stack = [];

    // Now iterate over the rows in the finedJson
    for (const [rowKey, rowValue] of Object.entries(finedJson)) {
    
        // Iterate over the columns in the current row
        for (const [colKey, colValue] of Object.entries(rowValue)) {
            
            // If the first column is not empty, it means that the current row is the node of CSVDefinedTreeNode
            if (colValue !== "") {

                // New a csv tree node
                const node = new CSVDefinedTreeNode(rowKey, colKey, rowValue);

                // Add the node to the stack
                stack.push(node);

                // Break current loop
                break;
            }
        }

        // Process the stack
        if (stack.length > 1) {
            updateTreeStack(stack);
        }
    }

    // Return the root node of the tree
    return stack;
}


const csvString = "a,,c,,e\nf,g,h,,j\nk,l,m,,o\np,q,r,,t\nu,v,w,,y\n,,,,\nz,1,2,,4\n5,6,7,,9\n0,!,@,,$\n%,^,&,,(";

// Convert the CSV string into a JSON object
const csvJson = csvToJson(csvString);

// Fine the CSV JSON
const finedJson = finedCsvJson(csvJson);
// console.log(finedJson);

// Generate a tree from the finedJson
const tree = genJsonTree(finedJson);
// console.log(tree);