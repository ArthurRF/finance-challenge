import prisma from "../../../../infra/database/prisma";
import { StockTicker } from "@prisma/client";
import { IStockTickersRepository } from "../IStockTickersRepository";


export class StockTickersRepository implements IStockTickersRepository {
  
  async create(slug: string): Promise<StockTicker> {
    return await prisma.stockTicker.create({
      data: {
        slug
      }
    })
  }
}