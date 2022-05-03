import { StockTicker, Tracks } from "@prisma/client";
import { ICreateTrackDTO } from "../dtos/ICreateTrackDTO";
import { IFindCurrentDataStockTickersDTO } from "../dtos/IFindCurrentDataStockTickersDTO";

export interface IStockTickersRepository {
  create(slug: string): Promise<StockTicker>;
  createTrack(data: ICreateTrackDTO): Promise<Tracks>;
  findStockTickerBySlug(slug: string): Promise<StockTicker | null>;
  findCurrentDataBySlug({
    slug,
    end,
    min_volume,
    start
  }: IFindCurrentDataStockTickersDTO): Promise<StockTicker>
}