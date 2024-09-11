// import * as dotenv from "dotenv";
// dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
}));

const io = new Server(server, {
  cors: { origin: "*" },
  methods: ["GET", "POST"],
});

const PORT = process.env.PORT  ;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log('New connection:', socket.id); // Log the socket ID on connection
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    socket.broadcast.emit("callended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(`Call request from ${from} to ${userToCall}`);
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    console.log(`Call accepted by ${data.to}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("callEnded", (id) => {
    console.log(`Call ended for ${id}`);
    io.to(id).emit("callEnded");
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
