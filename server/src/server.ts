import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRouter from './routes/authRouter';
import { initDatabase } from './config/database';
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize the database
try {
  initDatabase();
  console.log('Database initialized successfully');
} catch (error) {
  console.error('Error initializing database:', error);
  process.exit(1);
}
// routes
app.use('/api/auth', authRouter);

// health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
