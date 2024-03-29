const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const router = require('./routes/tasks');


app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/ToDo',{useNewUrlParser: true, useUnifiedTopology: true});


app.use('/', router);

//listen
app.listen(3000,()=>console.log('express started!'));
