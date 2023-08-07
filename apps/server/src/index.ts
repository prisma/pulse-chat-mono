import server from './server'
import configureSocketServer from './socket'
import { getChatHistory, subscribeToChat } from './data'

async function main() {
    const io = configureSocketServer(server)
    server.listen(3001, () => {
        console.log('Server listening on port 3001')
    })

    // Handle socket.io connections
    io.on('connection', async () => {
        const posts = await getChatHistory()
        
        // @ts-ignore
        io.emit('init-chat', posts.map( post => ({
            message: post.message,
            user: post.user.name
        })))
        
        io.on('disconnect', () => {
            io.close()
        })
    })

    await subscribeToChat(io)
}

main()