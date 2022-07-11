import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();
//stan 
const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

client.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '1233213',
        title: 'concerts',
        price: 20
    });

    client.publish('ticket:created', data, ()=>{
        console.log('Event published');
    })
});