import publicRouter from './routes/index.js' ;
import privateRouter from './routes/protectedRoutes.js';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet())
app.use(express.json());

app.use('/api/v1/restaurants',publicRouter);
app.use('api/v1/reviews');
//TODO: create an auth middleware
app.use('/api/v1/restaurants', privateRouter);

app.listen(8001, () => console.log(`Server is up and running on ${8001}`));