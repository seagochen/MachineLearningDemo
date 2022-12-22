/**
 * Define a class to hold the logical relationship in every cell of the Excel table
 */
class ExcelDataEntity {

    /**
     * constructor
     */
    constructor() {
        this.cellValue = null;
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

