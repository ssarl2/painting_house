Create a diagram depicting the situation where the user goes to the [single-page app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#single-page-app) version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa
  
```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server

    User->>Browser: Click or type https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>-Browser: HTML Document
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>-Browser: CSS file
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>-Browser: Java script file
    Note over Browser,Server: The browser starts executing the JavaScript code that fetches the JSON from the server
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>-Browser: JSON data file
    Note over Browser,Server: The browser executes the callback function that renders the notes
    Browser->>+Server: GET https://studies.cs.helsinki.fi/favicon.ico
    Server-->>-Browser: ico file
```