import { StockTicker, Tracks } from "@prisma/client";
import { ICreateTrackDTO } from "../dtos/ICreateTrackDTO";

export interface IStockTickersRepository {
  create(slug: string): Promise<StockTicker>;
  createTrack(data: ICreateTrackDTO): Promise<Tracks>;
  findStockTickerBySlug(slug: string): Promise<StockTicker | null>;
}