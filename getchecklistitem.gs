function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    //.addItem('Refresh Checklists', 'getChecklistItems')  // uncomment this line if you'd like to use send email function
    .addItem('Create/Update Tickets', 'createJiraTickets')
    .addToUi();
}

function getChecklistItems() {
  // Create a new Google Sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet();


  // Get all files in the Drive
  var files = DriveApp.getFiles();

  // Set the headers for the sheet
  sheet.appendRow(['File Name', 'Checklist Item']);

  // Iterate over each file
  while (files.hasNext()) {
    var file = files.next();

    // Check if the file is a Google Doc
    if (file.getMimeType() == "application/vnd.google-apps.document") {
      // Open the document
      var doc = DocumentApp.openById(file.getId());

      // Get the body of the document
      var body = doc.getBody();

      // Get all lists in the document
      var lists = body.getListItems();

      // Iterate over each list
      for (var i = 0; i < lists.length; i++) {
        // Check if the list item is a checkbox
        if (lists[i].getGlyphType() == DocumentApp.GlyphType.BULLET) {
          // Append the file name and checklist item to the sheet
          sheet.appendRow([file.getName(), lists[i].getText()]);
        }
      }
    }
  }
}
