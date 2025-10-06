# TODO: Implement Profile Picture Persistence

## Tasks
- [x] Update backend signin route to include `avatar` and `profilePicture` in response
- [x] Update backend signup route to include `profilePicture` in response (optional)
- [x] Test full flow: upload profile picture, logout, login, verify persistence

## Status
- Profile picture upload and display is already implemented in frontend.
- Backend save to DB is already implemented.
- Issue: profilePicture not returned on login, so not displayed after login.
- Fixed: signin and signup now return avatar and profilePicture.
