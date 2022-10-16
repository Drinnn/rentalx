import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'Hello, World!' });
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server is running!'));
