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
- [ ] Delete an user feature
  - [ ] When users of posts were deleted, it should still show the posts
- [ ] Need a feature of deleting comments
- [ ] Change the way of seleting a profile image. Currently, it can select multiple images
- [ ] Make it free to organize the order of pictures when uploading
- [ ] Bug - Tags are not parsed and stored correctly when it's posted
- [ ] Bug - If likes are pressed quickly, it will be updated as not expected
- [ ] Bug - When commented or liked to a pots, the picture index changes sometimes
- [ ] Delete table border at the end

### Done
- [x] Encrypt stored password
- [x] Need to update db to store one image instead of array for profile image
- [x] Add like feature
  - [x] Needs undo feature depending on login status. Like can be done only once
- [x] Show Edit and Delete buttons for the author
- [x] Exclude white-space in tags
- [x] Bug - tags are not displaying correctly. For example, last tag
  - [x] Store tags without white spaces
  - [x] Looks like it is related to maxLength of contents
    - It was a trimming text problem
- [x] Bug - after editing, all posts change to the edited post. And the login status is gone
- [x] Feature - when page is refreshed, login info is gone. It should keep
- [x] When logged in, do not show login button
- [x] Only users can leave comments
  - [x] Match proper users to comments
  - [x] Show user's profile image
- [x] Update storing images in DB. Big size images are causing not to display posts
  - [x] It affects now the like feature when it's pressed for the big size images
  - [x] Use GridFS to store large images over 16MB
  - [x] PostProfile pictures are disabled for a while. It has to be updated
  - [x] Restruct to store images
  - [x] When posts and users are deleted, images in the bucket should be also deleted
- [x] Bug - An empty comment can be added -> should not be added
- [x] Bug - When commented backend is crashed because PostComment updates an user, but no info of  a profile image. So, imageInfo object is gone