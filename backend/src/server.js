import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectToDB from './config/db.js';

import authRoutes from './routes/auth.route.js';
import stationRoutes from './routes/station.route.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();
connectToDB();

const app = express();
app.use(express.json())

app.use(cors())
app.use(helmet())

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/stations', stationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});