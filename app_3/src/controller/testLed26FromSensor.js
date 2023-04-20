const amqp = require("amqplib");
async function connect() {
  try {
    const connection = await amqp.connect(
      "amqp://g4amqp:g4amqp@g4amqp.freeddns.org:5672"
    );
    const channel = await connection.createChannel();
    await channel.assertQueue("led_26_from_sensor");
    setInterval(async () => {
      const msgBuffer = Buffer.from(
        JSON.stringify({
          status: Math.round(Math.random()) == 1 ? true : false,
        })
      );
      await channel.sendToQueue("led_26_from_sensor", msgBuffer);
      console.log("Sending message to led_26_sensor queue");
    }, 2000);
  } catch (ex) {
    console.error(ex);
    await channel.close();
    await connection.close();
  }
}

connect();
