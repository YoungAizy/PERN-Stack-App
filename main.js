const express =  require('express');
const hpp =  require('hpp');
const cors = require('cors');
// path = require('path');
const helmet = require('helmet');
const {AuthRouter} = require('./routes/auth.route.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors({
    origin:['http://192.168.91.1:3000','http://localhost:3000', 'https://feed-reviewer.netlify.app'], 
    credentials: true,
    methods: [ 'POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));
app.use(helmet())
app.use(express.json());
app.use(hpp());

app.use(express.static("./public"));

app.use('/api/v1/auth',AuthRouter);

app.post('/api/v1/auth/test',(req,res)=>{
    console.log(req.headers.authorization);
    res.send("Test 1 hit")
})

app.get('/test2', (req,res)=>{
    // var pem = fs.readFileSync('./private-key.pem',"utf8");
    // const user = {name: "ayanda"}
    // const jws = jwt.sign(user,pem,{algorithm:'RS256'});
    res.send("Test 2 Hitt.");
});

const port = process.env.PORT
app.listen(port, () => console.log(`Server is up and running on port ${port}`));