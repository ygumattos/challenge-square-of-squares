import app from './app';

const { SERVER_PORT, IP } = process.env;

app.listen(SERVER_PORT, IP, () => console.log('Running 🚀️'));
