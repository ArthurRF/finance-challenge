import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { RegisterStockTickerController } from '../modules/stock_ticker/controllers/RegisterStockTickerController';
import { container } from 'tsyringe';

const registerStockTickerController = container.resolve(
  RegisterStockTickerController
);

const app = express();
app.use(express.json());



app.post('/track', registerStockTickerController.handle)

export default app;