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
- [ ] Needs to update db to store one image instead of array
- [x] Add like feature
  - [ ] Needs undo feature depending on login status. Like can be done only once
- [x] Show Edit and Delete buttons for the author
- [ ] Delete table border at the end
- [ ] Exclude white-space in tags
- [ ] Bug - tags are not displaying correctly. For example, last tag
- [ ] Bug - after editing, all posts change to the edited post. And the login status is gone
- [ ] Update storing images in DB. Big size images are causing not to display posts
  - [ ] It affects now the like feature when it's pressed for the big size images