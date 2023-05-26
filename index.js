require('dotenv').config();
const router = require('./routes.js'); 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const addEntry = require("./model/dbEntries.js")
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session)
const flash = require('connect-flash');

const mongoURI = URL = "mongodb+srv://Posh21:"+process.env.URL_PASS+"@cluster0.tlxhdrm.mongodb.net/MCO?retryWrites=true&w=majority"; 

mongoose.set('strictQuery',true)
mongoose.connect(mongoURI , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
    //useCreateIndex:true,
})
    .then((res )=> {
        console.log("Connected");
    })

const store = new MongoDBSession({
    uri: mongoURI ,
    collection: "sessions",
})

//for css, js and images and such
app.use(express.static(__dirname + '/Public'));
app.use(express.static(__dirname));

app.use(express.urlencoded({extended: true}));

//Ejs enabled   
app.set('view engine', 'ejs');
app.set('views', 'view'); 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized:false,
    store: store,
   
}))

app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error');
	next();
});


/*This is the part to comment out after running once   
addEntry.newUser1(); 
addEntry.newUser2();
addEntry.newUser3(); 
addEntry.newUser4();
addEntry.newUser5(); 
addEntry.newUser6();

addEntry.newProduct1(); 
addEntry.newProduct2();
addEntry.newProduct3(); 
addEntry.newProduct4();
addEntry.newProduct5(); 

addEntry.newOrder1(); 
addEntry.newOrder2();
addEntry.newOrder3(); 
addEntry.newOrder4();
addEntry.newOrder5(); 

addEntry.newCategory1();
addEntry.newCategory2();
addEntry.newCategory3();
addEntry.newCategory4();
addEntry.newCategory5();
*/

port = 3000; 
app.listen(port, function(){
    console.log("Server is running at port: " + port)
}); 


app.use("/",router); 