import { JSONEventType } from '@eventstore/db-client';

export type UserCreatedEvent = JSONEventType<
    'UserCreatedEvent',
    {
        id: string;
        email: string;
        name: string;
    }
>;
