import mongoose from 'mongoose';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

class Database {
  constructor() {
    this.mongo();
    this.feedback();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    )
  }

  feedback() {
    this.mongoConnection.connection.on('error', () => console.error('connection error: '));
    this.mongoConnection.connection.once('on', () => console.error('database connected'));
  }
}

export default new Database();
