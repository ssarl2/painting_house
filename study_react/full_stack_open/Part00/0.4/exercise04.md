The situation where the user creates a new note on the [page](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking the *submit* button in **sequenceDiagram**
  
```mermaid
sequenceDiagram
Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
Server-->>-Browser: Redirect to /exampleapp/notes for a new HTTP GET request
Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
Server-->>-Browser: HTML Document
Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->>-Browser: CSS file
Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server-->>-Browser: Java script file
Note over Browser,Server: The browser starts executing the JavaScript code that fetches the JSON from the server
Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->>-Browser: JSON data file
Note over Browser,Server: The browser executes the callback function that renders the notes
Browser->>+Server: GET https://studies.cs.helsinki.fi/favicon.ico
Server-->>-Browser: ico file
```