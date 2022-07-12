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
        .setManualAckMode(true)
        //send all events if it's the first time the service is online
        .setDeliverAllAvailable()
        //register all events that have already been processed
        .setDurableName('listener-service');

    const subscription = client.subscribe(
        'ticket:created', 
        //queue to send event to only one instance of the service
        //also not to dump the event history from broker
        'listener-queue-group',
        options);

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