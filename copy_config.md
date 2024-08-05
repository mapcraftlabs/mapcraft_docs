# Copy configurations between projects

Copy configurations between projects, from one to one or many other projects.

## Permissions

Admin on source and destination projects.

## Obtain token

MapCraft Labs API auth is done via a Bearer Token provided by Firebase.

### Request

URL: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkHpE1XXujzAQyqAGbI3P6jl31nnT3adA
Method: POST
Body:

```json
{
	"email": "{{FIREBASE_USERNAME_OR_EMAIL}}",
	"password": "{{FIREBASE_PASSWORD}}",
	"returnSecureToken": true
}
```

### Response

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

## Copy configs with obtained bearer token

```sh
curl --request POST \
  --url https://api.mapcraft.io/copy_config/{{SOURCE_LAB_ID}} \
  --header 'Authorization: Bearer {{BEARER_TOKEN}}' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.3.2' \
  --data '{
  "project_ids": [
    "{{DESTINATION_LAB_ID_1}}",
		"{{DESTINATION_LAB_ID_2}}",
		"{{DESTINATION_LAB_ID_3}}",
		"{{DESTINATION_LAB_ID_4}}",
		"{{DESTINATION_LAB_ID_5}}"
  ]
}'
```