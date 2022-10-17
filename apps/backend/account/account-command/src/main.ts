import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: 'AccountCommand',
                protoPath: require.resolve('proto-account-command'),
                url: 'localhost:8001',
            },
        },
    );
    await app.listen();
}
bootstrap();
