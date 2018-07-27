function openSpreadsheet(SPREADSHEET_URL) {
	// The code below opens a spreadsheet using its URL and logs the name for it.
	// Note that the spreadsheet is NOT physically opened on the client side.
	// It is opened on the server only (for modification by the script).

  	var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  	Logger.log('Spreadsheet opened: ' + ss.getName());
  
    return ss;
}

function clearSheetData(sheet) {
    sheet.clearContents();
}

function clearSheetDataRange(sheet, range){
	sheet.getRange(range).clearContent();
}

function appendARow(sheet, row) {
	// Appends a new row with N columns to the bottom of the
	// spreadsheet containing the values in the array.
	// Row example = ['column1', 'column2', 'column3']
	sheet.appendRow(row);
}

function appendARowRange(sheet, rows, range){
    
    sheet.getRange(range).setValues(rows);
}

function setCellFormula() {
  var SPREADSHEET_URL = 'INSERT_SPREADSHEET_URL_HERE';
  // Name of the specific sheet in the spreadsheet.
  var SHEET_NAME = 'INSERT_SHEET_NAME_HERE';

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Sets formula for cell B5 to be sum of values in cells B3 and B4.
  var cell = sheet.getRange('B5');
  cell.setFormula('=SUM(B3:B4)');
}

function setNumberFormats() {
  var SPREADSHEET_URL = 'INSERT_SPREADSHEET_URL_HERE';
  // Name of the specific sheet in the spreadsheet.
  var SHEET_NAME = 'INSERT_SHEET_NAME_HERE';

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);

  var cell = sheet.getRange('B2');

  // Always show 3 decimal points.
  cell.setNumberFormat('0.000');
}