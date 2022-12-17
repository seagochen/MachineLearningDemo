/**
 * Define a class to hold the data in every cell of the Excel table
 */
class ExcelDataEntity {

    /**
     * constructor
     */
    constructor() {
        this.cellValue = null;
        this.cellRowInd = -1;
        this.cellColInd = -1;
        this.RowTitles = [];
        this.ColTitles = [];
    }

    // getter for the cell value
    get myCellValue() {
        return this.cellValue;
    }

    // getter for the cell row index
    get myCellRowInd() {
        return this.cellRowInd;
    }

    // getter for the cell column index
    get myCellColInd() {
        return this.cellColInd;
    }

    // getter for the row titles
    get myRowTitles() {
        return this.RowTitles;
    }

    // getter for the column titles
    get myColTitles() {
        return this.ColTitles;
    }

    // setter for the cell value
    set myCellValue(value) {
        this.cellValue = value;
    }

    // setter for the cell row index
    set myCellRowInd(value) {
        this.cellRowInd = value;
    }

    // setter for the cell column index
    set myCellColInd(value) {
        this.cellColInd = value;
    }

    // update the cell position
    updateCellPosition(rowInd, colInd) {
        this.cellRowInd = rowInd;
        this.cellColInd = colInd;
    }

    // add a row title
    addRowTitle(title) {
        this.RowTitles.push(title);
    }

    // add a column title
    addColTitle(title) {
        this.ColTitles.push(title);
    }

    // remove a row title
    removeRowTitle(title) {
        this.RowTitles.splice(this.RowTitles.indexOf(title), 1);
    }

    // remove a column title
    removeColTitle(title) {
        this.ColTitles.splice(this.ColTitles.indexOf(title), 1);
    }

    // if the cell contains a row title
    containsRowTitle(title) {
        return this.RowTitles.indexOf(title) !== -1;
    }

    // if the cell contains a column title
    containsColTitle(title) {
        return this.ColTitles.indexOf(title) !== -1;
    }

    // convert the cell to a JSON object
    toJSON() {
        return {
            cellValue: this.cellValue,
            cellRowInd: this.cellRowInd,
            cellColInd: this.cellColInd,
            RowTitles: this.RowTitles,
            ColTitles: this.ColTitles
        };
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to convert an integer to its corresponding excel column name
 * @param {int} num 
 * @returns 
 */
function numberToExcelName(num) {
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
 * Function to convert an excel column name to its corresponding integer
 * @param {string} excelName
 */
function excelNameToNumber(excelName) {
    let num = 0;
    for (let i = 0; i < excelName.length; i++) {
        num *= 26;
        num += excelName.charCodeAt(i) - "A".charCodeAt(0) + 1;
    }
    return num;
}

// test
// console.log(excelNameToNumber("AC"));
// console.log(numberToExcelName(29));

////////////////////////////////////////////////////////////////////////////////////////////////////


function autoFitCsvTable() {
    
}
