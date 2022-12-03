const express =require('express');
const app =express();
const mongoose = require('mongoose');
const dotenv=require("dotenv");
const routesurls = require('./routes/routes');
const cors = require('cors');


dotenv.config()

mongoose.connect(`mongodb+srv://baludbr:baludbr@cluster0.ghivz7m.mongodb.net/sdp1?retryWrites=true&w=majority`,()=>{
    console.log("Database Connected!!")
})

app.use(express.json())
app.use(cors());
app.use('/api',routesurls);
app.listen(process.env.PORT||2000,()=>{console.log("Server Started on 2000")})