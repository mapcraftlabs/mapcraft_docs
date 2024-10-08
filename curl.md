## Basic API Usage

MapCraft Web API auth is done via a Bearer Token provided by Firebase.

### Obtain token

```sh
curl --request POST \
  --url 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={{API_KEY}}' \
  --header 'Content-Type: application/json' \
  --data '{
  "email": "{{FIREBASE_USERNAME_OR_EMAIL}}",
  "password": "{{FIREBASE_PASSWORD}}",
  "returnSecureToken": true
}'
```

#### Response

```json
{
	"kind": "identitytoolkit#VerifyPasswordResponse",
	"localId": "{{LOCAL_ID}}",
	"email": "{{FIREBASE_USERNAME_OR_EMAIL}}",
	"displayName": "{{FIREBASE_USER_NAME}}",
	"idToken": "{{BEARER_TOKEN}}",
	"registered": true,
	"profilePicture": "{{PROFILE_PICTURE_URL}}",
	"refreshToken": "{{REFRESH_TOKEN}}",
	"expiresIn": "3600"
}
```

### Use API with obtained bearer token

```sh
curl --request POST \
  --url 'https://api.mapcraft.io/scenario/{{PROJECT_ID}}/{{LAYER_ID}}/{{SCENARIO_ID}}' \
  --header 'Authorization: Bearer {{BEARER_TOKEN}}' \
  --header 'Content-Type: application/json' \
```

## FAQ / Notes

### Invalid password error when obtaining a token

  - **An invalid password**

    Note that the password isn't the one from your Google Account, and different environments (like dev and prod) could have different passwords as well.

  - **A Firebase user not associated to an email account provider**
    The MapCraft app has two different options for logins. The first uses email and password and the other one uses Google Authentication. Using the latter doesn't mean you can use your Google Account password to login using the API. For this kind of usage you need to set email as the default login provider and associate a password to that.

### Layer name used by the API may not be the same as the `Layer Display Name` 

The layer name used by the API is the name used when the layer was created. Modifying the layer display name using the application will not affect the layer name used by the API.
