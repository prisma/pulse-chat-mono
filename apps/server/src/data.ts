import prisma from '@pulsechat/db'
import { Server } from 'socket.io';

export const getChatHistory = async () => {
    return await prisma.chat.findMany({
        select: {
            message: true,
            user: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 30
    })
}

export const subscribeToChat = async (io: Server) => {
    const subscription = await prisma.chat.subscribe({ create: {} });
    if (subscription instanceof Error) {
        throw subscription;
    }

    // Handle Prisma subscription events
    for await (const event of subscription) {
        const user = await getUserById(event.after.userId)

        if ( user ) {
            io.sockets.emit('chat', {
                message: event.after.message,
                user: user.name
            })
        }
    }

}
export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}