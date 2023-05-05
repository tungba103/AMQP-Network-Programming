const amqp = require("amqplib");
async function connect() {
  try {
    const connection = await amqp.connect(
      "amqp://g4amqp:g4amqp@g4amqp.freeddns.org:5672"
    );
    const channel = await connection.createChannel();
    // const queue = "led_26_status_1";
    const exchange = "led_26_status";
    await channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    const q = await channel.assertQueue("");
    await channel.bindQueue(q.queue, exchange, "");
    channel.consume(q.queue, (message) => {
      const input = JSON.parse(message.content.toString());

      const result = {
        status: input.status,
      };
      console.log(result);

      channel.ack(message);
    });
    console.log(`Waiting for messages...`);
  } catch (ex) {
    console.error(ex);
  }
}

connect();
// export { connect };
