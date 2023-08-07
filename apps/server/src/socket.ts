import * as socket from 'socket.io';
import { Server } from 'http';

export default (server: Server) => {
    const io = new socket.Server(server, {
        cors: {
            origin: true,
            credentials: true
        },
    });

    return io;
}