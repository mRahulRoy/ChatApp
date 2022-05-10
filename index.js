const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");

const PORT = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.send("Hello ws");
});



http.listen(PORT, (err) => {
    if (err) console.log("Error Occured : ", err);
    else console.log("Server is Running At ", PORT);
})

// socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("connected...");
    socket.on("message", (msgObj) => {
        console.log(msgObj);
        socket.broadcast.emit("message", msgObj);
    })
});