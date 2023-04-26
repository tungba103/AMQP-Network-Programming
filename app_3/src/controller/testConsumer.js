const amqp = require("amqplib");
async function connect(setState) {
  try {
    const connection = await amqp.connect(
      "amqp://g4amqp:g4amqp@g4amqp.freeddns.org:5672"
    );
    const channel = await connection.createChannel();
    await channel.assertQueue("temperature");
    channel.consume("temperature", (message) => {
      const input = JSON.parse(message.content.toString());
      setState((prev) => [
        ...prev,
        { time: input.time, temperature: input.temperature },
      ]);
      console.log(`Received time: ${input.time}`);
      console.log(`Received temperature: ${input.temperature}`);
      channel.ack(message);
    });
    console.log(`Waiting for messages...`);
  } catch (ex) {
    console.error(ex);
  }
}

export default connect;
