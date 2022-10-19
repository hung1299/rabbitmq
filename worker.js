const amqp = require('amqplib/callback_api');
const { QUEUE } = require('./constant');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(QUEUE, {
      durable: true
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);
    channel.consume(QUEUE, (msg) => {
        const msgContent = msg.content.toString();
        const secs = msgContent.split('.').length - 1;

        console.log(" [x] Received %s", msgContent);
        setTimeout(() => {
          console.log(" [x] Done");
        }, secs * 1000);
    }, {
        noAck: false
    })
  });
});