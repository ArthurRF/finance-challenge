import axios from "axios";
import { inject, injectable } from "tsyringe";
import { StockTicker } from "@prisma/client";
import { IStockTickersRepository } from "../repositories/IStockTickersRepository";

@injectable()
export class RegisterStockTickerService {
  constructor(
    @inject('StockTickersRepository')
    private stockTickersRepository: IStockTickersRepository
  ) {}
  async execute(stockTicker: string): Promise<StockTicker> {
    const alphaApiKey = process.env.ALPHA_API_KEY as string;

    const alphaReturn = await axios.get(
      'https://www.alphavantage.co/query',
      {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          interval: '5min',
          apikey: alphaApiKey,
          symbol: stockTicker
        }
      }
    );

    const stockTickerAlreadyExists = await this.stockTickersRepository.findStockTickerBySlug(stockTicker);

    if (!stockTickerAlreadyExists) {
      await this.stockTickersRepository.create(stockTicker);
    }
    
    await this.stockTickersRepository.createTrack({
      stockTikerSlug: stockTicker,
      open: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['1. open']),
      high: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['2. high']),
      low: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['3. low']),
      close: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['4. close']),
      volume: parseInt(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['5. volume']),
      lastUpdate: new Date(Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0])
    });

    const stockTickerUpdated = await this.stockTickersRepository.findStockTickerBySlug(stockTicker);

    return stockTickerUpdated;
  }
}