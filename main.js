import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
// path = require('path');
import helmet from 'helmet';
import AuthRouter from './routes/auth.route.js';
import fs from 'fs';
import jwt from 'jsonwebtoken'

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(hpp());

app.use(express.static("./public"))

app.use('/api/v1/auth',AuthRouter);

app.get('/user', (req,res)=>{
    var pem = fs.readFileSync('./private-key.pem',"utf8");
    const user = {name: "ayanda"}
    const jws = jwt.sign(user,pem,{algorithm:'RS256'});
    res.send(jws);
});


app.listen(7009, () => console.log(`Server is up and running on port ${7009}`));