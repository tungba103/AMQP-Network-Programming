const amqp = require("amqplib");
async function connect() {
  try {
    const connection = await amqp.connect(
      "amqp://g4amqp:g4amqp@g4amqp.freeddns.org:5672"
    );
    const channel = await connection.createChannel();
    // await channel.assertQueue("sensor_data_queue");
    setInterval(async () => {
      const now = new Date();
      const hoursAndMinutes =
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      const msgBuffer = Buffer.from(
        JSON.stringify({
          time: hoursAndMinutes,
          temperature: Math.floor(Math.random() * 50),
          humidity: Math.floor(Math.random() * 100),
        })
      );
      await channel.sendToQueue("sensor_data_queue", msgBuffer);
      console.log("Sending message to temperature queue");
    }, 2000);
  } catch (ex) {
    console.error(ex);
  }
}

connect();
