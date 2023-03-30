var express = require("express");
var bodyParser = require("body-parser");
var rabbitMQHandler = require("./connection");

var app = express();
var router = express.Router();
var server = require("http").Server(app);
var socketIO = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
var cors = require("cors");
var calcSocket = socketIO.of("/consumer");

app.use(cors());
rabbitMQHandler(async (connection) => {
  try {
    const channel = await connection.createChannel();
    await channel.assertQueue("temperature");
    channel.consume("temperature", (message) => {
      const input = JSON.parse(message.content.toString());
      const result = {
        time: input.time,
        temperature: input.temperature,
      };
      console.log(result);
      calcSocket.emit("consumer", JSON.stringify(result));
      channel.ack(message);
    });
  } catch (e) {
    console.log(e);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
router.route("/led/:id/status").put((req, res) => {
  try {
    const queue = req.url.split("/").slice(1).join("_");
    console.log(queue);
    rabbitMQHandler(async (connection) => {
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);
      const msgBuffer = Buffer.from(
        JSON.stringify({ status: req.body.status })
      );
      // console.log(req.body.status);
      await channel.sendToQueue(queue, msgBuffer);
      console.log("Sending message to temperature queue");
      // await channel.close();
      // await connection.close();
      return res.status(200).json({
        status: req.body.status,
      });
    });
  } catch (e) {
    console.log(e);
  }
});

server.listen(5555, "0.0.0.0", () => {
  console.log("Running at at localhost:5555");
});
