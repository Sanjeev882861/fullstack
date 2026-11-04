import express, {type Express, type Request, type Response} from 'express';
import serverless from 'serverless-http';
import { connectToMongoDB } from './testdb.ts';

const app: Express = express();

const client = await connectToMongoDB();
const db = client.db('fullstack');

app.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

export const handler = serverless(app);

export default app;