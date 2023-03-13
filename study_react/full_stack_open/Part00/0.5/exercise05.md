Create a diagram depicting the situation where the user goes to the [single-page app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#single-page-app) version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa
  
```mermaid
sequenceDiagram
    Browser->>Browser: Update(refresh) the note with the submitted data
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
```