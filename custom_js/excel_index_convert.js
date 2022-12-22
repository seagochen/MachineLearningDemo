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