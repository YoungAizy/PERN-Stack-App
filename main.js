import publicRouter from './routes/public.js';
import {restaurant_Router as privateRouter, reviewsRouter} from './routes/protected.js';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(cors({origin:['http://localhost:3000'], credentials: true}))
app.use(helmet())
app.use(express.json());

app.use('/api/v1/restaurants/public',publicRouter);
app.use('/api/v1/reviews', reviewsRouter);
//TODO: create an auth middleware
app.use('/api/v1/restaurants/protected', privateRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is up and running on ${port}`));