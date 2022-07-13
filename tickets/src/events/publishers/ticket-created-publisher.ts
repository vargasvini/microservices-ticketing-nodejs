import { ITicketCreatedEvent, Publisher, Subjects } from "@goustiee-org/common";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}