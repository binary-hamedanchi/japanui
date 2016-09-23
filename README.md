# JapanUI
UI for Japan site

##Pre-installments

- Install node and npm (https://nodejs.org/en/download/)
- Install webpack-dev-server 
`sudo npm install -g webpack-dev-server`
- Clone project
- Navigate to project root and run `npm install`

##Development
- Navigate to project root
- run `webpack-dev-server --https` or `grunt dev`
- UI will be available on `https://localhost:8080/`

##Deploy to your fork

```
grunt deploy
```

##Release to Production

```
grunt release [--production]
```
