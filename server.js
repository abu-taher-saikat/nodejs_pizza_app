const express = require('express')
const app = express();
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')



app.get('/',(req,res)=>{
    res.render('home')
})



// Assets 
app.use(express.static('public'))
// Set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs')


const PORT = process.env.PORT ||  3300;
app.listen(PORT,()=>{
    console.log(`Listein on port ${PORT}`);
})