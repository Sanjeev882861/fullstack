import express, {type Express, type Request, type Response} from 'express';
import { connectToMongoDB } from './testdb.ts';

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const client = await connectToMongoDB();
const db = client?.db('fullstack');

app.get('/', (req: Request, res: Response) => {
  db?.collection('users').find().toArray().then(users => {
    res.json(users);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error fetching users');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});