import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects-enum";
import { ITicketCreatedEvent } from "./ticket-created-event";


export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
    //alternative to readonly
    //subject: Subjects.TicketCreated = Subjects.TicketCreated;
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
    
    onMessage(data: any, msg: Message): void {
        console.log('Event data!', data);
        //everything is fine
        msg.ack();
    }
}