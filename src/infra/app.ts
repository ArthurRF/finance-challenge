import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import './database/containers'
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes)

export default app;