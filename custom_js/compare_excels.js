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
            const temp = new ExcelCellEntity(i, j, row[j]);
            rowCells.push(temp.toJSON());
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
function showExcelDiff(excel) {
    // read the excel file
    const workbook = XLSX.read(excel, {type: 'binary'});

    // Check the count of the sheets if it is 2
    if (workbook.SheetNames.length !== 2) {
        alert('We need to compare two sheets, please check the excel file');
        return;
    }

    // Get the first sheet data
    const first_sheet = loadExcelSheet(workbook, workbook.SheetNames[0]);

    // Get the second sheet data
    const second_sheet = loadExcelSheet(workbook, workbook.SheetNames[1]);

    // Compare the differences between the two sheets
    var delta = jsondiffpatch.diff(first_sheet, second_sheet); 

    // Display the differences on the web page
    document.getElementById('resultZone').innerHTML = jsondiffpatch.formatters.html.format(delta, first_sheet);
}
