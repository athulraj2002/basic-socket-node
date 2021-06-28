
import { createServer } from "http";
import { Server } from "socket.io";

export const initialize = (app: any) => {
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ["GET", "POST", "PATCH"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('join', (room) => {
            console.log('join',room);
            socket.join(room);
        });
        socket.on('createdData', (data) => {
            socket.broadcast.emit('createdData', data);
            // socket.emit('createdData', data);
        });
        socket.on('updatedData', (data) => {
            socket.broadcast.emit('updatedData', data);
            // socket.emit('updatedData', data);
        });
        socket.on('deletedData', (data) => {
            socket.broadcast.emit('deletedData', data);
            // socket.emit('deletedData', data);
        });
        socket.on('notification', (data) => {
            socket.to(data.receiverId).emit('notification', data);
        });
        socket.on('leave', (room) => {
            socket.leave(room);
        });
    });
    return httpServer;
}

