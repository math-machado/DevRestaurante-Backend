import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const listOrder = new ListOrdersService;

        const list = await listOrder.execute();

        res.json(list)
    }
}

export { ListOrdersController }