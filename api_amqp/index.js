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
var statusSocket = socketIO.of("/consumer_status");

app.use(cors());

let current_status_led26 = false;
let current_status_led27 = false;

rabbitMQHandler(async (connection) => {
  try {
    const channel = await connection.createChannel();
    // const queue = "led_26_status";
    const exchange = "led_26_status";
    await channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    const q = await channel.assertQueue("");
    await channel.bindQueue(q.queue, exchange, "");
    channel.consume(q.queue, (message) => {
      const input = JSON.parse(message.content.toString());
      current_status_led26 = input.status;
      const result = {
        status: input.status,
      };
      console.log(result);

      statusSocket.emit("consumer_status_led26", JSON.stringify(result));
      prevStatus = input.status;

      channel.ack(message);
    });
  } catch (e) {
    console.log(e);
  }
});

rabbitMQHandler(async (connection) => {
  try {
    const channel = await connection.createChannel();
    // const queue = "led_26_status";
    const exchange = "led_27_status";
    await channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    const q = await channel.assertQueue("");
    await channel.bindQueue(q.queue, exchange, "");
    channel.consume(q.queue, (message) => {
      const input = JSON.parse(message.content.toString());
      current_status_led27 = input.status;
      const result = {
        status: input.status,
      };
      console.log(result);

      statusSocket.emit("consumer_status_led27", JSON.stringify(result));
      prevStatus = input.status;

      channel.ack(message);
    });
  } catch (e) {
    console.log(e);
  }
});

rabbitMQHandler(async (connection) => {
  try {
    const channel = await connection.createChannel();
    // await channel.assertQueue("sensor_data_queue");
    channel.consume("sensor_data_queue", (message) => {
      const input = JSON.parse(message.content.toString());
      const result = {
        time: input.time,
        temperature: input.temperature,
        humidity: input.humidity,
      };
      console.log(result);

      calcSocket.emit("consumer_temparature", JSON.stringify(result));

      channel.ack(message);
    });
  } catch (e) {
    console.log(e);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
router.route("/status").get((req, res) => {
  return res.status(200).json({
    led_26: current_status_led26,
    led_27: current_status_led27,
  });
});
router.route("/led/:id/status").put((req, res) => {
  try {
    // const queue = req.url.split("/").slice(1).join("_");
    const exchange = req.url.split("/").slice(1).join("_");
    console.log(exchange);
    rabbitMQHandler(async (connection) => {
      const channel = await connection.createChannel();
      // await channel.assertQueue(queue);
      await channel.assertExchange(exchange, "fanout", {
        durable: false,
      });
      const msgBuffer = Buffer.from(
        JSON.stringify({ status: req.body.status })
      );
      // console.log(req.body.status);
      // await channel.sendToQueue(queue, msgBuffer);
      await channel.publish(exchange, "", msgBuffer);
      console.log("Sending message to led status exchange");
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
