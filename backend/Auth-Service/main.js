import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
// path = require('path');
import helmet from 'helmet';
import AuthRouter from './routes/auth.route.js';
// import UserRouter from './routes/user.route.js';

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(hpp());

app.use(express.static("./public"))
const middleware1 = (req,res,next)=> {
    console.log("midleware One");
    next();
};
const midletwo =(req,res,next)=>{
    console.log("MiddleWare Two");
    next()
}
app.use('/api/v1/auth',AuthRouter);
// app.use('api/v1/user', UserRouter);
app.get("/",middleware1,midletwo,(req,res)=>{

    res.send(`${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGF6eSBtYW4iLCJlbWFpbCI6ImxhenlAaG90bWFpbC5jby56YSIsImlhdCI6MTY5NDYzNTY3Mn0.PQhc9iK8r4fbqqcPnJh05pkVHcO5qj2R7rqdzEIEpmQ".length}`)
})

app.listen(5079, () => console.log(`Server is up and running on port ${5079}`));