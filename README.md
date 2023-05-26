# Chubbies

## Authors
- John Marvic Mojica
+ Jan Daniel Ng

## About 
> Chubbies is a locally owned and operated pet medicine supply store. Our mission is to provide dog and cat parents with everything that they need to ensure their pet lives a long and happy life. We love to talk about pets of all types and we are even more excited when you bring your furry family member into the store to meet us! We are constantly researching and learning about new medicines that can make our pets lives better.

> Our goal is to provide a clean, pet friendly store that caters to your dog or cat needs. While our store is not very large, we offer an experience that is fast, friendly, local, and less expensive supplies.

## NPM Packages
- bcrypt
+ body-parser
- connect-mongodb-session
+ ejs
- express
+ express-session
- mongodb
+ mongoose
- multer
+ nodemon
- router
+ dotenv
- connect-flash

## Instructions for Deploying Locally
### Installation Instructions
1. delete current package.json and package-lock.json files 
2. delete current node_modules folder
3. run the terminal and npm init
4. set main as index.js
5. install all necessary modules (list below)
6. run the terminal and use "nodemon index.js" or "node inde.js"


### Instructions for Populating the Database
Running the code for the first time will populate the database so to avoid duplicate entries, do the following:
1. open index.js 
2. comment out line 47 to 70  


### Base
- connect-mongodb-session
+ ejs
- express
- mongodb
+ mongoose
+ nodemon
- router
+ connect-flash
- dotenv
>(npm i ejs express mongodb mongoose nodemon router connect-mongodb-session connect-flash dotenv)

### For Login
+ body-parser
- bcrypt
+ express-session
>(npm i bcrypt body-parser express-session)

### For Image Uplaod
- multer
>(npm i multer)


### Account and Passwords Already in Database
1. Username: kawaiiwa 
    - Password: password1 
2. Username: greenarw 
    - Password: password2 
3. Username: nath01 
    - Password: password3 
4. Username: jayzone
    - Password: password4 
5. Username: cutiee314
    - Password: password5 
6. Username: admin
    - Password: password9

