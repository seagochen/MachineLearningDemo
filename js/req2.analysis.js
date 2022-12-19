/**
 * Define a class to hold the logical relationship in every cell of the Excel table
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

/**
 * Define a class to hold the data in every cell of the Excel table
 */
class ExcelCellEntity {

    /**
     * constructor
     * @param {int} rowInd 
     * @param {int} colInd
     * @param {string} cellValue
     */
    constructor(rowInd, colInd, cellValue) {
        this.rowInd = rowInd;
        this.colInd = colInd;
        this.value = cellValue;
    }

    // getter for the cell value
    get myCellValue() {
        return this.value;
    }

    // getter for the row index
    get myRowInd() {
        return this.rowInd;
    }

    // getter for the column index
    get myColInd() {
        return this.colInd;
    }

    // setter for the row index
    set myRowInd(value) {
        this.rowInd = value;
    }

    // setter for the column index
    set myColInd(value) {
        this.colInd = value;
    }

    // setter for the cell value
    set myCellValue(value) {
        this.value = value;
    }

    // convert the cell to a JSON object
    toJSON() {
        return {
            rowInd: this.rowInd,
            colInd: this.colInd,
            value: this.value
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

////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Load data from the given Excel sheet.
 * @param {any} workbook
 * @param {string} sheetName
 * @returns {{}}
 */
function loadExcelSheet(workbook, sheetName) {

    // load the data in CSV format from the Excel file
    const rawData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], { // Options here
        FS: '(@_@)',    // separator
        RS: '\r\n'      // new line
    });

    // split the data into rows
    let csvData = rawData.split('\r\n');

    // create a 2D array to hold the data
    let data = [];

    // iterate over the rows
    for (let i = 0; i < csvData.length; i++) {
        // split the row into columns
        const row = csvData[i].split('(@_@)');

        // empty array to store the Cell objects
        let rowCells = [];

        // iterate over the columns and use the Cell class to hold the data
        for (let j = 0; j < row.length; j++) {
            rowCells.push(new ExcelCellEntity(i, j, row[j]));
        }

        // add the row to the 2D array
        data.push(rowCells);
    }

    // return the 2D array
    return data;
}


/**
 * Load the data from the given Excel file
 * @param {string} excel 
 */
function loadExcelData(excel) {
    // read the excel file
    const workbook = XLSX.read(excel, {type: 'binary'});

    // Check the count of the sheets if it is 2
    if (workbook.SheetNames.length !== 2) {
        alert('We need to compare two sheets, please check the excel file');
        return;
    }

    // Get the first sheet data
    // const first_sheet = {
    //     name: workbook.SheetNames[0],
    //     data: loadExcelData(workbook, workbook.SheetNames[0])
    // };

    // // Get the second sheet data
    // const second_sheet = {
    //     name: workbook.SheetNames[1],
    //     data: loadExcelData(workbook, workbook.SheetNames[0])
    // };

    console.log(loadExcelSheet(workbook, workbook.SheetNames[0]));
}
