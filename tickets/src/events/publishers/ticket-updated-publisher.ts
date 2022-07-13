import { ITicketUpdatedEvent, Publisher, Subjects } from "@goustiee-org/common";
import { Stan } from 'node-nats-streaming';

export class TicketUpdatedPublisher extends Publisher<ITicketUpdatedEvent>{
    constructor(client: Stan){
        super(client);
    }
    readonly subject = Subjects.TicketUpdated;
}