import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { GetCurrentDataStockTickerService } from "../services/GetCurrentDataStockTickerService";

@injectable()
export class GetCurrentStockTickerStatusController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;
    const {
      start,
      end,
      min_volume
    } = req.query;

    const getCurrentDataStockTickerService = container.resolve(
      GetCurrentDataStockTickerService
    );

    const stockTicker = await getCurrentDataStockTickerService.execute({
      slug,
      start: start ? new Date(Number(start)) : undefined,
      end: end ? new Date(Number(end)) : undefined,
      min_volume: min_volume ? Number(min_volume) : undefined
    });

    return res.status(200).send(stockTicker);
  }
}