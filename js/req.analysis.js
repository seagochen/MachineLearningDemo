function convertExcelToCsv(excelSheet) {
    // Convert the excel sheet data in csv format
    const csv = XLSX.utils.sheet_to_html(excelSheet);

    console.log(csv);   

    // Split the csv data into rows
    // const rows = csv.split('

    // Return the csv data
    return csv;
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
    const firstSheetData = convertExcelToCsv(workbook.Sheets[firstSheetName]);
    
    // Get the second sheet data
    const secondSheetData = convertExcelToCsv(workbook.Sheets[secondSheetName]);

    // var ExcelTable = document.getElementById("ExcelTable");
    // ExcelTable.innerHTML = "";
    // ExcelTable.appendChild(myTable);
}