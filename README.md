# japanui
UI for Japan site

##Pre-installments

- Install node and npm (https://nodejs.org/en/download/)
- Install webpack-dev-server 
`sudo npm install -g webpack-dev-server`
- clone project
- navigate to project root and run `npm install`

##Development
- Navigate to project root
- run `webpack-dev-server`
- UI will be available on http://localhost:8080/

##Release to production (should be changed in the future)
- commit your changes
- Navigate to project root
- run `npm run compile`
- commit updated bundle.js
- push changes
- create PR to *binary-com/japanui/gh-pages*