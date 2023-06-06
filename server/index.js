import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import notFoundHandler from './src/middlewares/common/notFound.middleware.js';
import errorHandler from './src/middlewares/common/error.middleware.js';
import authRoute from './src/routes/auth/auth.route.js';
import conversationRoute from './src/routes/user-panel/conversation.route.js';
import messageRoute from './src/routes/user-panel/message.route.js';
import adminUserRoute from './src/routes/admin-panel/user.route.js';
import userRoute from './src/routes/user-panel/user.route.js';
import { addUser, removeUser, setIo } from './src/socket/socket.manager.js';

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
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN1],
    credentials: true,
  })
);

// set static folder
app.use(express.static('public'));

// Create HTTP server
const server = createServer(app);

// Connect Socket.IO to the server with CORS options
const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN1],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  },
});

setIo(io);

io.on('connection', (socket) => {
  // add new user
  socket.on('new-user-add', (userId) => {
    // if user is not added previously
    addUser(userId, socket.id);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});

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

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
