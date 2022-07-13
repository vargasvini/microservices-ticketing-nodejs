import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';
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

   new TicketCreatedListener(client).listen();
});

//graceful shutdown
//SIGINT = INTERRUPTED SIGNAL
//SIGTERM = TERMINATED SIGNAL
process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());