import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
// path = require('path');
import helmet from 'helmet';
import { expressjwt } from 'express-jwt';
import JwksRsa from 'jwks-rsa';
// import UserRouter from './routes/user.route.js';

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(hpp());

// app.use(express.static("./public"))
app.use(expressjwt({
    secret: JwksRsa.expressJwtSecret({
        jwksUri: "http://localhost:5079/.well-known/jwks.json",
        cache: true,
        rateLimit: true
    }),
    algorithms: ["HS256"]
}).unless({path:['/']}))

app.get('/', (req,res)=>{
    res.send("This is a public route");
})
// app.use('/api/v1/auth',AuthRouter);
app.get('api/v1/user', (req,res)=>{
    res.send("protected route safely hit")
});


app.listen(6001, () => console.log(`Server is up and running on port ${6001}`));