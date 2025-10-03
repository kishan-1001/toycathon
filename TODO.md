# TODO: Modify Project to Use MongoDB for Signup and Signin

## Backend Changes
- [x] Add bcrypt dependency to backend/package.json
- [x] Install new dependencies
- [x] Modify backend/models/User.js: Add password field and hashing methods
- [x] Update backend/routes/auth.js: Remove Firebase usage, implement signup and signin routes with MongoDB
- [x] Update backend/index.js: Remove Firebase admin initialization

## Frontend Changes
- [x] Create frontend/src/pages/Signup.jsx: Implement signup page with API call to backend
- [x] Update frontend/src/pages/Login.jsx: Remove Firebase auth, use API call for signin
- [ ] Remove Firebase dependency from frontend/package.json if no longer needed

## Testing
- [ ] Test signup functionality
- [ ] Test signin functionality
- [ ] Verify MongoDB user storage
