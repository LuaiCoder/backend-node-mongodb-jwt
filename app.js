const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config')
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


//Routes
const usersRoutes = require('./routers/users');

const api = process.env.API_URL;
app.use(`${api}/users`, usersRoutes);


//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=> {
    console.log('Database connection established.......');
})
.catch((err)=> {
    console.log(err);
})



//Server
app.listen(3000, ()=>{
    console.log(api)
    console.log('listening on port 3000')
});