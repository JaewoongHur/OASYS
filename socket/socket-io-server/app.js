const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(bodyParser.text());
app.use(index);
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  app.post("/data", (req, res) => {
    const status = req.body; // 아두이노에서 전송한 데이터
    console.log("Received data from Arduino:", status);

    // 데이터를 React 앱으로 전송 (WebSocket을 통해 전달)

    socket.emit("FromArduino", status);

    res.sendStatus(200); // 성공 응답 코드 (200 OK)를 보냅니다.
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
