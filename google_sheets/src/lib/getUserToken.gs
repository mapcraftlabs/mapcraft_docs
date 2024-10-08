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