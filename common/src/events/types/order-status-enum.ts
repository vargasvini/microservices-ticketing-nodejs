export enum OrderStatusEnum {
    //When the order has been created
    //But the ticket has not been reserved
    Created = 'created',

    //The ticket the order is trying to reserve has already been reerved
    //Or when the user has cancelled the order
    //Or the order expires before payment
    Cancelled = 'cancelled',

    //The order has successfully reserved the ticket
    AwaitingPayment = 'awaiting:payment',

    //The order has reserved the ticket 
    //and the user has provided payment successfully
    Complete = 'complete'
}