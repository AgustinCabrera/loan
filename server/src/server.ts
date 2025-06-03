import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import loginRoutes from './routes/loginRoutes';
import registerRoutes from './routes/registerRoutes';

// init express
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(helmet()); // http security header
app.use(express.json());
app.use(morgan('dev')); // log requests
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
