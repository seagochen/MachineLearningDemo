function convertExcelToCsv(name, excelSheet) {
    // Convert the Excel sheet data in csv format
    const csv = XLSX.utils.sheet_to_csv(excelSheet);

    // Convert the csv data to json format
    let json = {};

    // Split the csv data by new line
    const rows = csv.split('\n');

    // Loop through the rows
    for (let i = 0; i < rows.length; i++) {
        // Row number starts from 1
        const rowNumber = i + 1;

        // Split the row by comma, and add the row to json
        json[rowNumber] = rows[i].split(',');
    }

    // Debug
    const style = "color: green; background: #eee; font-size: 50 ";
    console.log("Excel sheet %c" + name + "%c loaded successfully, %c" + rows.length + "%c rows found.\nJson data: ",
        style, "", style, "", json);

    // Return the json object
    return json;
}

function convertNumToExcelLetter(columnNumber) {
    let columnName = "";
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while (columnNumber > 0) {
        let modulo = (columnNumber - 1) % 26;
        columnName = alpha[modulo] + columnName;
        columnNumber = Math.floor((columnNumber - modulo) / 26);
    }

    return columnName;
}


function compareSheets(firstJsonObj, secondJsonObj) {

    // If the two sheets have different size of rows, return false
    if (Object.keys(firstJsonObj).length !== Object.keys(secondJsonObj).length) {
        return {
            result: -1,
            message: "The two sheets have different size of rows.",
            data: {}
        }    
    }

    // Derive the keys of the first sheets
    const firstKeys = Object.keys(firstJsonObj);

    // To store the result
    let compareResult = {};

    // Loop through the keys
    for (let i = 0; i < firstKeys.length; i++) {
        // Get the key
        const key = firstKeys[i];

        // Get the first row
        const sheetRow_1 = firstJsonObj[key];
        const sheetRow_2 = secondJsonObj[key];

        // If the two rows have different size of columns, return false
        if (sheetRow_1.length !== sheetRow_2.length) {
            return {
                result: -1,
                message: "The two sheets have different size of columns.",
                data: {}
            }    
        }

        // To store the different columns and their values
        let differentColumns = [];

        // Loop through the columns
        for (let j = 0; j < sheetRow_1.length; j++) {
            // If the two columns have different values, add the column to differentColumns
            if (sheetRow_1[j] !== sheetRow_2[j]) {
                differentColumns.push({
                    column: convertNumToExcelLetter(j + 1),
                    value_1: sheetRow_1[j],
                    value_2: sheetRow_2[j]
                });
            }
        }

        // If the differentColumns is not empty, add the row to compareResult
        if (differentColumns.length > 0) {
            compareResult[key] = differentColumns;
        }
    }

    // If the compareResult is empty, return true
    if (Object.keys(compareResult).length === 0) {
        return {
            result: 0,
            message: "The two sheets are the same.",
            data: {}
        }
    } else {
        // Else return false
        return {
            result: 1,
            message: "The two sheets are different.",
            data: {
                "rows": Object.keys(compareResult).length,
                "columns": firstJsonObj[firstKeys[0]].length,
                "data":compareResult
            }
        }
    }
}


function convertJsonToTable(firstSheetName, secondSheetName, jsonObj) {

    // Create a html table
    let table = document.createElement('table');

    // Add w3-table w3-striped w3-bordered to the table
    table.classList.add('w3-table');
    table.classList.add('w3-striped');
    table.classList.add('w3-bordered');

    // Get the parameters
    const data = jsonObj.data;
    const keys = Object.keys(data);

    // Create the table header
    // # | firstName | secondName | Check Rectangle
    let row = table.insertRow(0);

    let cell = row.insertCell(0);
    cell.innerHTML = "#";

    cell = row.insertCell(1);
    cell.innerHTML = firstSheetName;

    cell = row.insertCell(2);
    cell.innerHTML = secondSheetName;
    
    cell = row.insertCell(3);
    cell.innerHTML = "Checked";

    // Create the table body
    for (let i = 0; i < keys.length; i++) {

        // Get the array from the given key 
        const array = data[keys[i]];

        for (let j = 0; j < array.length; j++) {
            // Get a row from the array
            const rowObj = array[j];

            // Append a new row
            row = table.insertRow(-1);

            // Create a cell number
            cell = row.insertCell(0);
            cell.innerHTML = keys[i] + rowObj.column;

            // Create a cell to keep sheet 1's value
            cell = row.insertCell(1);
            cell.innerHTML = rowObj.value_1;

            // Create a cell to keep sheet 2's value
            cell = row.insertCell(2);
            cell.innerHTML = rowObj.value_2;

            // Create a cell to hold a checkbox
            cell = row.insertCell(3);
            cell.innerHTML = "<input type='checkbox' class='form-check-input' id='check_" + keys[i] + rowObj.column + "'>";
        }
    }

    // Return the table
    return table;
}


function analysisExcel(data) {
    // Read the Excel File data in binary
    const workbook = XLSX.read(data, {
        type: 'binary'
    });

    // Check the count of the sheets if it is 2
    if (workbook.SheetNames.length !== 2) {
        alert('We need to compare two sheets, please check the excel file');
        return;
    }

    // Get the first sheet name
    const firstSheetName = workbook.SheetNames[0];

    // Get the second sheet name
    const secondSheetName = workbook.SheetNames[1];
    
    // Get the first sheet data
    const firstJson = convertExcelToCsv(firstSheetName, workbook.Sheets[firstSheetName]);
    
    // Get the second sheet data
    const secondJson = convertExcelToCsv(secondSheetName, workbook.Sheets[secondSheetName]);

    // Compare the two sheets
    const result = compareSheets(firstJson, secondJson);

    // Depending on the result, show the message
    if (result.result !== 1) {
        
        alert(result.message);
    } else {

        // If the two sheets are not the same, show the differences in a table
        const table = convertJsonToTable(firstSheetName, secondSheetName, result.data);

        // Add the table to the result div
        let excelTable = document.getElementById('ExcelTable');

        // Clear the table
        excelTable.innerHTML = "";

        // Add the table to the div
        excelTable.appendChild(table);
    }
}