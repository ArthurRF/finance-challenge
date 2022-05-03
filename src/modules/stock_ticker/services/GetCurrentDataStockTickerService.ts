import { inject, injectable } from "tsyringe";
import { StockTicker } from "@prisma/client";
import { IStockTickersRepository } from "../repositories/IStockTickersRepository";

interface IRequest {
  slug: string;
  start: Date;
  end: Date;
  min_volume: number;
}

@injectable()
export class GetCurrentDataStockTickerService {
  constructor(
    @inject('StockTickersRepository')
    private stockTickersRepository: IStockTickersRepository
  ) {}
  async execute({
    slug,
    start,
    end,
    min_volume
  }: IRequest): Promise<StockTicker> {
    const currentData = await this.stockTickersRepository.findCurrentDataBySlug({
      slug,
      start,
      end,
      min_volume
    });

    return currentData;
  }
}