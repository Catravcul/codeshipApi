Spaceship project 

Build Setup
# install dependencies
npm install

# serve with hot reload at localhost:5000
npm run start
To obtain data you need to make request to de ip address + port + endpoint. Example: localhost:5000/user/signup

Once you made the request, you will recieve an object with two parameters: "data", and "status". If status is false, data will contain an error message. Otherwise, if status is true, data will contain the data you requested for (Or just a feedfack for a login request).

 ##### Make login request 
To make the request to login you just need to make a post request to auth/login endpoint. You need to make sure the data object passed through POST has "email" and "password" parameters. Otherwise it will not work.