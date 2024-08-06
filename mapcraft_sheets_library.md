## MapCraft Sheets Library

This library provides a set of functions to communicate Google Sheets with MapCraft Web API.

It's written on Google Apps Script, a Google Workspace JavaScript-based language. 

## sheetAsObjectArray

```js
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
```

## getUserToken.gs
```js
/**
  This is used to authenticate API requests using your app email/password - the token returned
  from this function must be passed in the header of follow-up requests.
*/
function getUserToken(email, password, API_KEY='{{GOOGLE_API_KEY}}') {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY
    const options = {
      "method": "post",
      "payload": {
        "returnSecureToken": true,
        "email": email,
        "password": password
      }
    }
    const response = UrlFetchApp.fetch(url, options)
    const data = JSON.parse(response.getContentText())
    return data["idToken"]
}
```

## makeAPIRequest.gs

```js
function makeAPIRequest(url, payload, token) {
  const options = {
    "method": "POST",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + token
    },
    "payload": JSON.stringify(payload),
    muteHttpExceptions: true
  }

  const response = UrlFetchApp.fetch(url, options)
  const data = JSON.parse(response.getContentText())
  return data
}
```

## getSimulationName.js

```js
/**
 * Generates a simulation name based on the current date, time, and an iteration index.
 *
 * Creates a string that includes the current month, day, hour, and minutes, 
 * appended with a letter representation of the iteration index. The iteration index is 
 * converted to a base-26 string using the letters 'A' to 'Z'.
 *
 * @param {number} iteration - The iteration index to be converted to a letter representation.
 * @returns {string} - A string in the format 'SIM_MMDD_HHMM-LETTER', where:
 *                     MM - Month (01-12)
 *                     DD - Day (01-31)
 *                     HH - Hour (00-23)
 *                     MM - Minutes (00-59)
 *                     LETTER - Letter(s) representing the iteration index (A, B, ..., Z, AA, AB, ..., AZ, etc.)
 */
function getSimulationName(iteration) {
  var date = new Date();

  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  
  const hour = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const base = alphabet.length
  
  let letter = ''

  while (iteration >= 0) {
    letter = alphabet[iteration % base] + letter;
    iteration = Math.floor(iteration / base) - 1; // decrement to handle cases where number=26^x
  }

  // Generate the string with the date and the letter
  const generatedString = 'SIM_' + month + day + '_' + hour + minutes + '-' + letter;

  return generatedString
}
```