// database connection
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import dataFactory from './data.factory.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful'))
  .catch((e) => console.log(e));

// insert data
dataFactory();
