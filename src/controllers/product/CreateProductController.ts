import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body

        if (!req.file) {
            throw new Error("Envie uma imagem do produto");
        } else {

            const {filename: banner, originalname} = req.file

            const createProdutcService = new CreateProductService;

            const product = await createProdutcService.execute({
                name, price, description, banner, category_id
            });

            return res.json(product)
        }

    }
}

export { CreateProductController }