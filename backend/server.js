require("dotenv").config();
let app = require("./src/app.js");
let connecttoDB = require("./src/db/db")
connecttoDB()
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const algenerator = require("./src/ai.js");



// Allow frontend connection
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));



// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


// Socket.IO connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for message from frontend
    socket.on("backend", async(message) => {
        try {
            let AI = await algenerator(message);
            // Send message to all connected clients
            io.emit("frontend", AI);
        } catch (error) {
            console.error("AI Error:", error.message);
            io.emit("frontend", `AI Error: ${error.message}`);
        }
    });

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
