import app from './app.ts';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
