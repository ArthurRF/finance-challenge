import prisma from "../../../../infra/database/prisma";
import { StockTicker, Tracks } from "@prisma/client";
import { IStockTickersRepository } from "../IStockTickersRepository";
import { ICreateTrackDTO } from "../../dtos/ICreateTrackDTO";
import { IFindCurrentDataStockTickersDTO } from "modules/stock_ticker/dtos/IFindCurrentDataStockTickersDTO";


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

  async findCurrentDataBySlug({
    slug,
    end,
    min_volume,
    start
  }: IFindCurrentDataStockTickersDTO): Promise<StockTicker> {
    let whereInclude: any;

    if(end) {
      whereInclude = {
        lastUpdate: {
          lte: new Date(end)
        }
      }
    }

    if(start) {
      whereInclude = {
        lastUpdate: {
          gte: new Date(start)
        }
      }
    }

    if(min_volume) {
      whereInclude = {
        volume: {
          gte: min_volume
        }
      }
    }

    const data = await prisma.stockTicker.findFirst({
      where: {
        slug
      },
      include: {
        Tracks: {
          where: whereInclude,
          orderBy: {
            lastUpdate: "desc"
          },
          take: 1
        }
      }
    });

    return data;
  }
}