import { ITicketCreatedEvent, Publisher, Subjects } from "@goustiee-org/common";
import { Stan } from 'node-nats-streaming';

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent>{
    constructor(client: Stan){
        super(client);
    }
    readonly subject = Subjects.TicketCreated;
}