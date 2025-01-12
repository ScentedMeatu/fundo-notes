import amqp from 'amqplib';

let connection;
let channel;

export async function initRabbitMQ() {
    if (!connection) {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('RabbitMQ connection and channel initialized.');
    }
}

export async function sendMessage(user) {
    try {
        const queue = 'create_user_queue';

        await channel.assertQueue(queue, {
            durable: true,
        });

        const message = JSON.stringify(user);
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

        console.log(`Message sent to queue`);
    } catch (error) {
        console.error('Failed to send message to RabbitMQ:', error);
    }
}
