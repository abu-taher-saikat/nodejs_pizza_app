require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash'); //for session perpurs
const MongoDbStore = require('connect-mongo')(session) //session store.


// Database connection.
const url = "mongodb+srv://saikat:saikat1095@cluster0.htwdq.mongodb.net/pizza_app?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true, useFindAndModify : true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected...');
}).catch(err=> {
    console.log('Connection failed...');
})

// Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection : 'sessions'
})

// Session config
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    store : mongoStore,
    saveUninitialized : false,
    cookie : {maxAge : 1000 * 60 * 24 } //24 Hours
    // cookie : {maxAge : 1000 * 15 } //15sec
}));


app.use(flash());

// Assets 
app.use(express.static('public'))
app.use(express.json());


// Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
})
// Set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs')

require('./routes/web')(app);


const PORT = process.env.PORT ||  3300;
app.listen(PORT,()=>{
    console.log(`Listein on port ${PORT}`);
})