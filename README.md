# japanui
UI for Japan site

## Development:
Navigate to root folder and run

`webpack-dev-server`

You will UI by the adress http://localhost:8080/.

## Release

To update bundle.js with last changes run:

`npm compile`

After that bundle.js should be committed and PR created.

*Project setup (draft)
Install Nodejs https://nodejs.org/en/download/

Install globally webpack-dev-server ```sudo npm install -g webpack-dev-server```

Navigate to project root folder and install all depencies ```npm install```

If needed change the link to QA websocket in ```src/js/config/socket.json``` 