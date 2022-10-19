const amqp = require('amqplib/callback_api');
const { QUEUE } = require('./constant');

amqp.connect("amqp://localhost", (error0, connection) => {
    if(error0){ 
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1;
        }
        const msg = process.argv.slice(2).join(' ') || "Hello world";

        channel.assertQueue(QUEUE, {
            durable: true
        })

        channel.sendToQueue(QUEUE, Buffer.from(msg), {
            persistent: true
        });
        console.log(" [x] Sent %s", msg);

        // const NUMBER_OF_KEY_PRESS = 10;
        // for (const x in [...Array(NUMBER_OF_KEY_PRESS).keys()]) {
        //     channel.sendToQueue(QUEUE, Buffer.from(msg + x));
        //     console.log(" [x] Sent %s", msg + x);
        // }
    })

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500)
})