import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
// path = require('path');
import helmet from 'helmet';
import morgan from 'morgan'
import profileRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config'

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(hpp());
app.use(cookieParser())
app.use(morgan('dev'))


app.use('/api/v1/profile', profileRouter);

app.post('/test', async (req,res)=>{
    console.log(req.header['authorization']);
    console.log(req.body);
    console.log(req.file);
    
    res.send("Molo Ayanda")
})

const port = 6001
app.listen(port, () => console.log(`Server is up and running on port ${port}`));