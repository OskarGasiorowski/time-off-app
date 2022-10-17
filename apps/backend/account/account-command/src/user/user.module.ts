import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './domains';

const commandHandlers = [CreateUserHandler];

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers: [...commandHandlers, UserRepository],
})
export class UserModule {}
