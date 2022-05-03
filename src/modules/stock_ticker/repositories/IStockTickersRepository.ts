import { StockTicker } from "@prisma/client";

export interface IStockTickersRepository {
  create(slug: string): Promise<StockTicker>;
}