sequenceDiagram
    participant browser
    participant server

 
    Note left of browser: Message: Bonjour! - Click: save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Saving the new note with STATUS CODE 302 and redirecting to notes page <br/> GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    Note left of browser: Getting the CSS file <br/> attached to note.html - main.css
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: STATUS CODE 200 Return main.css
    deactivate server

    Note left of browser: Getting the javascript file <br/> attached to note.html - main.js
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: STATUS CODE 200 Return main.js
    deactivate server

    Note left of browser: The browser executes the JavaScript code that <br/> fetches the JSON from the server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: STATUS CODE 200 - JSON Response - [{ "content": "please", "date": "2024-04-05T00:42:09.291Z" }, ... ]
    deactivate server

    Note left of browser: The browser renders the notes by <br/> executes the callback function that 