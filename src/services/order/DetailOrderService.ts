import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string
}

class DetailOrderService {
    async execute({ order_id }: OrderRequest) {
        const items = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include:{
                order: true,
                product: true
            }
        })
        

        return items
    }
}

export { DetailOrderService }