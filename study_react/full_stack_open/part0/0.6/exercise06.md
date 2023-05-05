Create a diagram depicting the situation where the user creates a new note using the single-page version of the app
  
```mermaid
sequenceDiagram
    Browser->>Browser: Update(refresh) the note with the submitted data
    Note over Browser: The browser starts executing the JavaScript code that refreshes and updates the browser
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
```