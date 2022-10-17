import { Global, Module } from '@nestjs/common';
import { IdentityModule } from './identity/identity.module';
import { UserModule } from './user/user.module';
import { EventStoreDBClient } from '@eventstore/db-client';

const eventStoreClient: EventStoreDBClient = EventStoreDBClient.connectionString`esdb+discover://localhost:2113?tls=false`;

@Global()
@Module({
    imports: [IdentityModule, UserModule],
    controllers: [],
    providers: [{ provide: EventStoreDBClient, useValue: eventStoreClient }],
    exports: [EventStoreDBClient],
})
export class AppModule {}
