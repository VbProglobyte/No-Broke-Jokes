# No-Broke-Jokes

The user will be able to add expenses and deposits to their budget with or without a connection. When entering transactions offline, they should populate the total when brought back online.

![screencapture-localhost-3000-2022-01-06-15_56_40](https://user-images.githubusercontent.com/83515305/148981504-12e3e9d9-b509-48fa-9ade-2ee7167225d9.png)

### To show that it works offline as well : 

![image](https://user-images.githubusercontent.com/83515305/148981603-39ecc64e-651d-402c-9a1a-765d31b3183d.png)


## Installation / Tech used 

### Technology : 
    Node.js  - https://nodejs.org/en/download/
    MongoDB - https://docs.mongodb.com/guides/server/install/
    Mongoose
    NPM - https://www.npmjs.com/
    Express 
    Heroku - https://heroku.com
    Service Worker

### Install : (after cloning to your repo)
    1. Be sure to install node if you don't already have the software. 
    2. Install npm package in the terminal. [npm i]
    3. Run the express package installation. [npm install express]
    4. Now activate the Mongo database in a seperate terminal. [mongod]
    5. Run mongo [mongo] - the port should be listening now.
    6. Run the seeds file so the data will populate [npm run seed] or [node seeders/seed.js]
    7. Now run [node server.js] to initialize and the app will be available on localhost. 
    8. You can open the heroku app by entering [heroku open] in the terminal, or locally using http://localhost:3001

# Live App & Usage 

https://no-broke-jokes.herokuapp.com/



## Help

https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-heroku-and-mongodb-atlas
