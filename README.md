After cloning the repo, you will still need several files. Namely the db connection config files, which you will have to setup for your express server locally and you will also need the .env file, which I can give upon request. The .env file contains environment variables such as keys, salt and hash, etc that are necessary for authentication procs. 

You will also need to run "npm install" to install all of the project dependencies, this may take a little while. After that, setup your express server and make sure you have all of the necessary databases, tables and stored procedures. 

, To test the api, open two powershell windows in VSCode. In the first, enter "npm run start" enter, this will start the routes server. In the second, enter "npm run startAuth" enter, this will start the authentication server.

Make sure you have all relevant sql stored procedures in their most recent form on your express server and the db and all tables are named properly. Ensure that your user in the Users table is properly setup as well. 

With both servers spun up, you can then use the postman collection to query the api. 

