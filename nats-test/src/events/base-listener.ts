import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions(){
        return this.client
            .subscriptionOptions()
            //send all events if it's the first time the service is online
            .setDeliverAllAvailable()
            //ACK = acknowledgement
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            //register all events that have already been processed
            .setDurableName(this.queueGroupName);
    }

    listen(){
        const subscription = this.client.subscribe(
            this.subject,
            //queue to send event to only one instance of the service
            //also not to dump the event history from broker
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) =>{
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    parseMessage(msg: Message){
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'))
    }
}