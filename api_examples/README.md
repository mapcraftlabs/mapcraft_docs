## Basic API Usage

MapCraft Web API auth is done via a Bearer Token provided by Firebase.

### Obtain token

```sh
curl --request POST \
  --url 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkHpE1XXujzAQyqAGbI3P6jl31nnT3adA' \
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