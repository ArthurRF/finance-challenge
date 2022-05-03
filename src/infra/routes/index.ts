import { Router } from "express";
import { container } from "tsyringe";
import { RegisterStockTickerController } from "../../modules/stock_ticker/controllers/RegisterStockTickerController";
import { GetCurrentStockTickerStatusController } from "../../modules/stock_ticker/controllers/GetCurrentStockTickerStatusController";

const registerStockTickerController = container.resolve(
  RegisterStockTickerController
);
const getCurrentStockTickerStatusController = container.resolve(
  GetCurrentStockTickerStatusController
);

const routes = Router();

routes.post('/track', registerStockTickerController.handle)

routes.get('/status/:slug', getCurrentStockTickerStatusController.handle)

export default routes;