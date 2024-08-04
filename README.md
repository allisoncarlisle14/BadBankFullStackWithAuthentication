## BadBank Full Stack Exercise

### Description/Motivation:
This is an academic project that I edited for MIT xPRO's web development class. The goal was to create a full stack banking application using the MERN stack. I built it to practice creating a three tier application. This may help other students who are in their first year of learning to code. 

A lot of the code was provided for me by MIT xPRO, but I added many extensions such as incorporating authentication with Json Web Tokens and adding a delete account component.  

#### Installation Guidlines: 
* Create a project in Firebase (located at firebase.google.com) and add a web application with email/password authentication to it. 
* Create a MongoDB and run it in Docker on port 27017.
* Create a root directory for your project on your computer and in a terminal window in the root directory for the project,type 

```

npm init

```

to initialize a Node.js project. 
* git clone this repository into the root directory you created. 
* I did not include two files because they contained confidential authentication information, so you will need to add these two files to your project: 
* In the root directory of the project, create a utils folder with one file titled jwt.js. The content of that file should be:

```

    const jwt = require('jsonwebtoken');
    const SECRET_KEY = 'INSERT_YOUR_SECRET_KEY_HERE'; // Replace with your secret key

    function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    }

    function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
    }

    module.exports = { generateToken, verifyToken };

```

Except you should replace INSERT_YOUR_SECRET_KEY_HERE with your own secret key (I think it can be whatever you want, but I'd recommend a long string of random characters because I'm assuming that's more secure than a shorter key).  

* In the public directory of the project (or at least that's where my file is, although I'm questioning my choices now), create a file called firebase.js. The content of that file should be: 

```
    (function() {
        // Your web app's Firebase configuration
        const firebaseConfig = {
        apiKey: "REPLACE WITH YOUR OWN",
        authDomain: "REPLACE WITH YOUR OWN",
        projectId: "REPLACE WITH YOUR OWN",
        storageBucket: "REPLACE WITH YOUR OWN",
        messagingSenderId: "REPLACE WITH YOUR OWN",
        appId: "REPLACE WITH YOUR OWN"
        };

        firebase.initializeApp(firebaseConfig);

    }());

```

Except you should replace each instance of REPLACE WITH YOUR OWN with the values in your own Firebase configuration.   
* In a terminal window, navigate to the root directory of your project and type 

```

    npm install 

```

in order to install all of the depenencies listed in the package.json file. 
* Type 

```

    npm start 

```

in the same terminal window to start up the application. 
* Open up a browser and enter localhost:3000 in the url. The app should be working (hopefully).

#### Screenshots:
This is what the application looks like before you've logged in:

![Image](/Images/HomePageImage.png)

This is what the application looks like after you've logged in as a regular user (and selected the deposit page):

![Image](/Images/DepositPageImage.png)


#### Technology used:
* React (not create-react-app) for the front end (client)
* Express Node.js for the back end (server)
* MongoDB for the database

* Firebase for authentication (for practice)
* Json Web Tokens (JWT) for authentication between the client and the server. 

#### Support:

N/A

#### Features:
This project is for academic use only. The Bad Bank application allows users to create an account or log in with an existing account, at which point they can deposit or withdraw (fake) money from their account, check the balance of their account, delete their account, or log out of their account. There is also an administrative user who can see a list of all of the users and their account information, as well as a complete history of user transactions. (If the administrative user is signed in, another tab appears in the navigation bar called All Data.)

#### Roadmap of Future Improvements: 
Here are some of the ways in which I would like to improve my project: 
* Separate the back end into more individual files, for instance creating a routes folder containing auth.js, protected.js, and server.js, where auth.js contains the login and create account routes and protected.js contains the routes that require JWT's to access the database. The server.js file will import the two routers defined in those files. 
* Separate the middleware authorization function properly in into its own file and pass JWT's in the header instead of in the body of the HTTP requests sent by the client. 
* Change the way I ask the database to find documents because I currently have the database searching by email, but I probably should ask the database to search by _id, since it can probably get the correct document without searching through all of them that way. It's not an issue with my current application, but if I had millions of users, searching by email would be slow (unless perhaps if I figured out how to set the _id property to the user's email). 
* Further refine the front end to reduce the size of the files. For instance, separating each component file into an API file and a module file, where the API file contains the logic to communicate with the backend. 
* Improving the appearance of the front end. The cards don't look very professional. 
* Possibly re-creating the project with Create React App or Next.js. There are some things I've done that should not be used in production. It'd be nice to learn how to create a production-ready application as opposed to an academic application. 
* Add instructions to this README.md file that include more step by step instructions on how to build the project from scratch. 

#### License Information:

MIT License

Copyright (c) 2020 John Williams

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
