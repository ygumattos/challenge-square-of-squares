import app from './app';

const { PORT, IP } = process.env;

app.listen(PORT, IP, () => console.log('Running 🚀️'));
