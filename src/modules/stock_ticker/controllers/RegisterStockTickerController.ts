import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { RegisterStockTickerService } from "../services/RegisterStockTickerService";
import { CronJob } from "cron";

@injectable()
export class RegisterStockTickerController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { stockTicker } = req.body;

    const registerStockTickerService = container.resolve(
      RegisterStockTickerService
    );

    if (!stockTicker) {
      throw new Error('The property stockTicker is required!')
    }

    const data = await registerStockTickerService.execute(stockTicker);

    if (data) {
      const job = new CronJob(
        '*/10 * * * *',
        async function() {
          await registerStockTickerService.execute(stockTicker)
        },
        null,
        true,
        'America/Los_Angeles'
      );

      job.start();
    }

    return res.status(201).send(data);
  }
}