import { CreateUserDto } from './create-user.dto';
import { Aggregate } from '../../lib/Aggregate';
import { UserCreatedEvent } from './events';
import { v4 as uuid } from 'uuid';
import { jsonEvent, ResolvedEvent, StreamingRead } from '@eventstore/db-client';

interface UserData {
    email: string;
    name: string;
}

export class UserAggregate extends Aggregate<UserCreatedEvent> {
    private data: UserData;

    get email(): string {
        return this.data.email;
    }

    get name(): string {
        return this.data.name;
    }

    private constructor() {
        super();
    }

    static async recreate(
        events: StreamingRead<ResolvedEvent<UserCreatedEvent>>,
    ) {
        const user = new UserAggregate();

        for await (const { event } of events) {
            switch (event.type) {
                case 'UserCreatedEvent': {
                    user.apply(event);
                    break;
                }
            }
        }

        return user;
    }

    static create(createUser: CreateUserDto): UserAggregate {
        const event = jsonEvent<UserCreatedEvent>({
            id: uuid(),
            data: { ...createUser, id: uuid() },
            type: 'UserCreatedEvent',
        });

        const user = new UserAggregate();

        user.enqueueEvent(event);
        user.apply(event);

        return user;
    }

    private apply(event: UserCreatedEvent): void {
        this.data = { ...event.data };
        this._id = event.data.id;
    }
}
