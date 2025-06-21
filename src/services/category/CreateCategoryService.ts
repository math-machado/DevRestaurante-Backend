import prismaClient from "../../prisma";

interface CategotyRequest {
    name: string
}

class CreateCategoryService {
    async execute({ name }: CategotyRequest) {

        if (name === '') {
            throw new Error('Nome invalido')
        }

        const categotyAlredyExists = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        })

        if(categotyAlredyExists){
            throw new Error('Categoria já existe')
        }

        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })

        return category
    }
}

export { CreateCategoryService }