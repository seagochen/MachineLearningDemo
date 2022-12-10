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
        json[i + 1] = [rowJson];
    }

    // Return the resulting JSON object
    return json;
}