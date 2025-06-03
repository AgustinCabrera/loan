import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

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
