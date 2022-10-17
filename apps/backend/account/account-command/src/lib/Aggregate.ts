import { JSONEventType } from '@eventstore/db-client';

export class Aggregate<TEvent extends JSONEventType> {
    protected _id: string;

    get id(): string {
        return this._id;
    }

    private uncommittedEvents: TEvent[] = [];

    protected enqueueEvent(event: TEvent) {
        this.uncommittedEvents.push(event);
    }

    public popAllEvents(): TEvent[] {
        const events = [...this.uncommittedEvents];
        this.uncommittedEvents = [];
        return events;
    }
}
