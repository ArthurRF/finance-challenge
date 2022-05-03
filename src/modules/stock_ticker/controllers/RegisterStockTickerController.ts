import axios from "axios";
import { Request, Response } from "express";
import prisma from "../../../infra/database/prisma";
import { container, injectable } from "tsyringe";
import { RegisterStockTickerService } from "../services/RegisterStockTickerService";


@injectable()
export class RegisterStockTickerController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { stockTicker } = req.body;
    const alphaApiKey = process.env.ALPHA_API_KEY as string;

    const registerStockTickerService = container.resolve(
      RegisterStockTickerService
    );

    if (!stockTicker) {
      throw new Error('The property stockTicker is required!')
    }

    const data = await registerStockTickerService.execute(stockTicker);

    return res.status(200).send('');
  }
}