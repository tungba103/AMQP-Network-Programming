var amqp = require("amqplib/callback_api");
module.exports = (callback) => {
  amqp.connect(
    "amqp://g4amqp:g4amqp@g4amqp.freeddns.org:5672",
    (error, conection) => {
      if (error) {
        throw new Error(error);
      }

      callback(conection);
    }
  );
};
