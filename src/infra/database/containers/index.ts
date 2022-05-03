import { container } from 'tsyringe';

import { StockTickersRepository } from '../../../modules/stock_ticker/repositories/implementations/StockTickersRepository';
import { IStockTickersRepository } from '../../../modules/stock_ticker/repositories/IStockTickersRepository';

container.registerSingleton<IStockTickersRepository>(
  'StockTickersRepository',
  StockTickersRepository
);