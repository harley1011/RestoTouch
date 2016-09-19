##Getting Started
1. Clone the repo

2. Make sure you have NodeJS installed.

3. Run "npm install"

4. Run "npm start"

5. Goto "http://127.0.0.1:10010/"


The server is a NodeJS application that uses ExpressJS for declaring routes and hosting the HTML, JPEG, Javascript, and CSS files necessary for the web application.
The server also makes use of Swagger for the Web API that will be used by both the web application and mobile application

The web application template can be found here https://github.com/start-angular/SB-Admin-BS4-Angular-2 and if doing developement on it you can use the necessary
tasks in gulp to help host the server locally, npm start simply uses the production source files so by using the gulp tasks you can run the developement versions and
also make use of a lot of integrated tools that came with the project like browsersync which has livereloading.

The web api as mentioned earlier uses Swagger, which is a tool to help document us document our api. To learn more try this tutorial 
https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger

Heroku is used to host the application, the URL for our server can be found here https://resto-touch.herokuapp.com. Heroku is hooked to the master branch
of this repo so when you push to heroku it will redeploy the application to include the newest changes so if you push a broken build then it will no longer
work on the server.

