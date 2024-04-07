```mermaid

sequenceDiagram
    participant browser
    participant server

 
    Note left of browser: Loading notes (SPA) Page
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: Returning HTML with STATUS CODE 200
    deactivate server

    Note left of browser: Getting the CSS file <br/> attached to html - main.css
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: STATUS CODE 200 Return main.css
    deactivate server

    Note left of browser: Getting the javascript file <br/> attached to html - spa.js
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: STATUS CODE 200 Return main.js
    deactivate server

    Note left of browser: The browser executes the JavaScript code that <br/> fetches the JSON from the server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: STATUS CODE 200 - JSON Response - [{ content: "66", date: "2024-04-07T01:06:25.096Z"}, ... ]
    deactivate server

    Note left of browser: Creating new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Server push the new note, create a response. 
    server-->>browser: STATUS CODE 201 - JSON Response - {"message":"note created"}
    deactivate server

    Note left of browser: The browser renders the updates.
