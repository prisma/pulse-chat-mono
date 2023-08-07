import express from 'express';
import http from 'http';
import * as socket from "socket.io";
import prisma from '@pulsechat/db'
import cors from 'cors'

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new socket.Server(server, {
    cors: {
        origin: true,
        credentials: true
    },
});

const PORT: number = 3001;
let subscription;

async function main() {
    // Set up Prisma subscription
    subscription = await prisma.chat.subscribe({});

    if (subscription instanceof Error) {
        throw subscription;
    }

    // Handle socket.io connections
    io.on('connection', async () => {
        const posts = await prisma.chat.findMany({
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

        // @ts-ignore
        io.emit('init-chat', posts.map( post => ({
            message: post.message,
            user: post.user.name
        })))
        io.on('disconnect', () => {
            console.log('user disconnected');
        })
    })

    // Start the server
    server.listen(PORT, (): void => {
        console.log('SERVER IS UP ON PORT:', PORT);
    });

    // Handle Prisma subscription events
    for await (const event of subscription) {
        console.log(event)
        const user = await prisma.user.findUnique({
            where: {
                id: event.after.userId
            }
        })
        io.sockets.emit('chat', {
            message: event.after.message,
            user: user.name
        })
    }
}

main()