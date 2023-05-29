import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import notFoundHandler from './src/middlewares/common/notFound.middleware.js';
import errorHandler from './src/middlewares/common/error.middleware.js';
import authRoute from './src/routes/auth/auth.route.js';
import conversationRoute from './src/routes/user-panel/conversation.route.js';
import messageRoute from './src/routes/user-panel/message.route.js';
import adminUserRoute from './src/routes/admin-panel/user.route.js';
import userRoute from './src/routes/user-panel/user.route.js';

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful'))
  .catch((e) => console.log(e));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors origin
app.use(cors({ origin: [process.env.CORS_ORIGIN, 'http://192.168.0.103:3000'] }));

// set static folder
app.use(express.static('public'));

// public routes
app.use('/', authRoute);

// admin routes
app.use('/admin/user', adminUserRoute);

// user routes
app.use('/user/conversation', conversationRoute);
app.use('/user/message', messageRoute);
app.use('/user/user', userRoute);

// not found handler
app.use(notFoundHandler);

// default error handle
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
