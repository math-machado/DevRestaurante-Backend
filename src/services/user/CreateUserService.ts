import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        //verificar se enviou o email
        if (!email) {
            throw new Error('Email incorreto')
        }

        //verificar se o email ja existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error('Email já existe')
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }