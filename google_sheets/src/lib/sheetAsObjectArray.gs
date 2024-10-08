function sheetAsObjectArray(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const [headers, ...data] = sheet.getDataRange().getValues();

  return data.map(row => {
    return row.reduce((acc, value, i) => {
      const key = headers[i];
      if (key === '') return acc;
      return { ...acc, [key]: value };
    }, {});
  });
}