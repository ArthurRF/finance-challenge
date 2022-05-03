import prisma from "../../../../infra/database/prisma";
import { StockTicker, Tracks } from "@prisma/client";
import { IStockTickersRepository } from "../IStockTickersRepository";
import { ICreateTrackDTO } from "../../dtos/ICreateTrackDTO";


export class StockTickersRepository implements IStockTickersRepository {
  async create(slug: string): Promise<StockTicker> {
    return await prisma.stockTicker.create({
      data: {
        slug
      }
    })
  }

  async createTrack({
    stockTikerSlug,
    close,
    high,
    lastUpdate,
    low,
    open,
    volume
  }: ICreateTrackDTO): Promise<Tracks> {
    return await prisma.tracks.create({
      data: {
        stockTikerSlug,
        close,
        high,
        lastUpdate,
        low,
        open,
        volume
      },
      include: {
        StockTicker: true
      }
    })
  }

  async findStockTickerBySlug(slug: string): Promise<StockTicker | null> {
    return await prisma.stockTicker.findFirst({
      where: {
        slug
      },
      include: {
        Tracks: true
      }
    })
  }
}