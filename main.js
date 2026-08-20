import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {prisma} from './config/db.config.js';
import schemaWithResolvers from './schema/index.js'
// import {restaurant_Router as privateRouter, reviewsRouter} from './routes/protected.js';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
schema: schemaWithResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors({
    origin:'*', 
    // credentials: true,
    methods: [ 'POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control'],
}));

// Health check to check if server is reachable
app.get('/health/live', (_,res) => res.status(200).send('Okay'));

app.get('/health/ready', async (_, res) => {
  try {
    // Executes a simple 'SELECT 1' to verify DB connectivity
    // Works for PostgreSQL, MySQL, and SQLite
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'READY',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Logs the actual error for internal debugging
    console.error('Health check failed:', error);
    
    res.status(503).json({
      status: 'NOT_READY',
      database: 'unreachable',
      error: error.message
    });
  }
});


app.use(
  '/api/v1/restaurants',
  cors({
    origin:'*', 
    // credentials: true,
    methods: [ 'POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control'],
  }),
  helmet(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      prisma,
      //TODO: add user/auth data here from req.headers
    }),
  }),
);

// app.use('/api/v1/restaurants/public',publicRouter);
// app.use('/api/v1/reviews', reviewsRouter);
//TODO: create an auth middleware
// app.use('/api/v1/restaurants/protected', privateRouter);

const port = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port}, resolve));
console.log(`Server is up and running on ${port}`);