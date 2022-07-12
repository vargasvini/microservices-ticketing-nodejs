import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();

//stan
const client = nats.connect('ticketing', randomBytes(4).toString('hex'),{
    url: 'http://localhost:4222'
});

client.on('connect', ()=>{
    console.log('Listener connected to NATS');
    
    //graceful shutdown
    client.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    //ACK = acknowledgement
    const options = client
        .subscriptionOptions()
        .setManualAckMode(true);
    const subscription = client.subscribe('ticket:created', 'listener-queue-group');

    subscription.on('message', (msg: Message)=>{
        const data = msg.getData();
        if(typeof data === 'string'){
            const formattedData = JSON.parse(data);
            console.log(formattedData);
        }

        //everything is fine
        msg.ack();
    });
});

//graceful shutdown
//SIGINT = INTERRUPTED SIGNAL
//SIGTERM = TERMINATED SIGNAL
process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());