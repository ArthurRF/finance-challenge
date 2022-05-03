import axios from "axios";
import prisma from "../../../infra/database/prisma";
import { injectable } from "tsyringe";
import { StockTicker } from "@prisma/client";

@injectable()
export class RegisterStockTickerService {

  async execute(stockTicker: string): Promise<void> {
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

    

    // await prisma.tracks.create({
    //   data: {
    //     stockTikerSlug: stockTicker,
    //     open: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['1. open']),
    //     high: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['2. high']),
    //     low: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['3. low']),
    //     close: parseFloat(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['4. close']),
    //     volume: parseInt(alphaReturn.data['Time Series (5min)'][Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0]]['5. volume']),
    //     lastUpdate: new Date(Object.keys(alphaReturn.data['Time Series (5min)']).slice(-1)[0])
    //   }
    // });

  }
}