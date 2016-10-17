![Image of travis](https://api.travis-ci.com/harley1011/RestoTouch.svg?token=svJ7YxEt4VzqxxA86ptx&branch=develop)
##Getting Started
This will launch a local web server that will host the web application HTML, Javascript, and CSS Files and the API
1. Clone this repo

2. Make sure you have NodeJS installed and npm.

3. Run "npm install -g ts-node" (Note: sudo might be required on Mac or Linux)

4. Run "npm run setup"

5. Goto "http://127.0.0.1:10010/" in a browser to see the web application

6. Run "swagger project edit" to see the web API editor 

## This applications web app was started by using this template http://startangular.com/product/sb-admin-bootstrap-4-angular-2/
Note:
- Before adding your own custom components it's a good idea to go to that link and go to the preview site to see if they already have components that you'll need

- A lot of the components were removed but can be added back in if they are needed

- The preview site gives a lot of examples of how to style things so check it out

- The template uses Bootstrap CSS, rather than writing your own custom CSS check if you can do it with Bootstrap first, it'll be a mess if we all have our own CSS for each component


##If you want to do developement on just the web application then you can run the command "npm run start.dev"
this will also launch a local web server but this one has livereload, automatic transpiling of source files when updated, and other stuff

Block diagram of the major components in our platform can be found here https://drive.google.com/file/d/0BwQrVDDNZ8XFUDdUS1FKT3NBR3c/view?usp=sharing

- The server is a NodeJS application that uses ExpressJS for declaring routes and hosting the HTML, JPEG, Javascript, and CSS files necessary for the web application.

- The server also makes use of Swagger for the Web API that will be used by both the web application and mobile application. To learn more try this tutorial https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger

- The server also connects to a Postgres database using a ORM called http://docs.sequelizejs.com/en/v3/ , the connection parameters for the db can be found in the config/database.js file

- Heroku is used to host the application, the URL for our server can be found here https://resto-touch.herokuapp.com. Heroku is hooked to the master branch of this repo so when you push to heroku it will redeploy the application to include the newest changes so if you push a broken build then it will no longer
work on the server.

- The Postgres database is hosted on AWS

#Project Structure Explanation
- app.js is the main entry point used to launch our app. It calls webSiteRoutes.js which setups the routes for serving the HTML, Javascript, and CSS files. It also makes use of the Swagger module which will make the api accessible.

- src folder contains the source files for the web application, developement is done in Typescript and then transpiled into Javascript so that the browser can execute it. The transpiled Javascript files are outputed to dist

- dist which stands for distribution, as mentionned before it contains the output of the transpiled Typescript files to Javascript, dev contains the regular files that haven't been minified, prod contains the production ready files so they've been minified and concatenated together so they will be used on the server. (Note: this folder is not tracked on Github because it is generated from the files in src using the gulp tasks)

- tools contains the gulp tasks implementations for transpiling the Typescript files into Javascript, adding the scripts to index.html, minifying, livereload and many other tasks

- api contains the swagger related source files such as the documentation files known as .yaml and the Javascript files which are the implementation for the web api paths

- database contains the models that map to a table in the database for the ORM sequelize

- config contains config parameters to connect to the database 




## Angular 2 Style guidelines for Web App
  We will follow angulars 2 official style guide which can be found here https://angular.io/styleguide
  
## NodeJs Javascript Style guidelines for Web Api
 We will follow the style guidelines listed here https://github.com/felixge/node-style-guide

