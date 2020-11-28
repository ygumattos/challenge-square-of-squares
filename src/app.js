import express from 'express';
import routes from './routes';

// import './database'
import 'dotenv/config';

class App {
  constructor() {
    this.server = express();

    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
