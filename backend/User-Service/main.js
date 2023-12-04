import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
// path = require('path');
import helmet from 'helmet';
import { expressjwt } from 'express-jwt';
import JwksRsa from 'jwks-rsa';
import profileRouter from './routes/index.js';
import 'dotenv/config'

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(hpp());

// app.use(express.static("./public"))
// app.use(expressjwt({
//     secret: JwksRsa.expressJwtSecret({
//         jwksUri: "http://localhost:5079/.well-known/jwks.json",
//         cache: true,
//         rateLimit: true
//     }),
//     algorithms: ["RS256"]
// }).unless({path:['/']}))


app.use('/api/v1/profile', profileRouter);

app.get('/test',(req,res)=>{
    console.log(req.header['authorization']);
    res.send("Molo Ayanda")
})

const port = process.env.PORT || 6001
app.listen(port, () => console.log(`Server is up and running on port ${port}`));