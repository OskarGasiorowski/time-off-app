import { UserAggregate } from './user.aggregate';
import {
    EventStoreDBClient,
    FORWARDS,
    jsonEvent,
    START,
} from '@eventstore/db-client';
import { UserCreatedEvent } from './events';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    private readonly streamNameBase = 'user';

    constructor(private client: EventStoreDBClient) {}

    async save(user: UserAggregate) {
        const events = user.popAllEvents().map((event) => {
            return jsonEvent(event);
        });

        await this.client.appendToStream(
            `${this.streamNameBase}-${user.id}`,
            events,
        );
    }

    async findOne(id: string) {
        const events = await this.client.readStream<UserCreatedEvent>(
            `${this.streamNameBase}-${id}`,
            {
                direction: FORWARDS,
                fromRevision: START,
            },
        );

        return await UserAggregate.recreate(events);
    }
}
