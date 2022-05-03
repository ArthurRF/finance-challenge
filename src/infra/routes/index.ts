import { RegisterStockTickerController } from "../../modules/stock_ticker/controllers/RegisterStockTickerController";
import { Router } from "express";
import { container } from "tsyringe";

const registerStockTickerController = container.resolve(
  RegisterStockTickerController
);

const routes = Router();

routes.post('/track', registerStockTickerController.handle)

export default routes;