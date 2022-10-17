import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserRequest, CreateUserResponse } from './requests';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands';

@Controller()
export class UserController {
    constructor(private commandBus: CommandBus) {}

    @GrpcMethod('UserService', 'Create')
    async create(request: CreateUserRequest): Promise<CreateUserResponse> {
        const res = await this.commandBus.execute(
            new CreateUserCommand(request.email, request.name),
        );
        return { id: res };
    }
}
