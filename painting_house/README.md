# painting house
Deploy a website with react to a server by using Github actions.

## Progress
- It just started.
- Tried to use github actions. But it doesn't make sense yet.

## Plan
1. github (source code)
2. github actions (CI/CD)
3. github page (web server)
4. React (Frontend frame work)
5. Express js (node.js) (REST API server in amazon light sail) (edited)
6. Mongo DB
7. Render deploy

## TODO
  - [x] Needs undo feature depending on login status. Like can be done only once
- [ ] Delete table border at the end
- [ ] Update storing images in DB. Big size images are causing not to display posts
  - [ ] It affects now the like feature when it's pressed for the big size images
  - [x] Use GridFS to store large images over 16MB
  - [ ] Restruct to store images
- [ ] When users of posts were deleted, it should still show the posts
- [x] Only users can leave comments
  - [x] Match proper users to comments
  - [x] Show user's profile image
  - [ ] Need a feature of deleting comments
- [ ] Tags are not parsed and stored correctly when it's posted

### Done
- [x] Encrypt stored password
- [x] Need to update db to store one image instead of array for profile image
- [x] Add like feature
- [x] Show Edit and Delete buttons for the author
- [x] Exclude white-space in tags
- [x] Bug - tags are not displaying correctly. For example, last tag
  - [x] Store tags without white spaces
  - [x] Looks like it is related to maxLength of contents
    - It was a trimming text problem
- [x] Bug - after editing, all posts change to the edited post. And the login status is gone
- [x] Feature - when page is refreshed, login info is gone. It should keep
- [x] When logged in, do not show login button
