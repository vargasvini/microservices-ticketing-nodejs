import { Subjects } from "../subjects-enum";

export interface ITicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    }
}