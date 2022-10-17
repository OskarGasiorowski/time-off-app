import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserAggregate, UserRepository } from '../../domains';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private userRepository: UserRepository) {}

    async execute(command: CreateUserCommand): Promise<any> {
        // TODO check or something

        const user = UserAggregate.create({ ...command });
        await this.userRepository.save(user);

        return user.id;
    }
}
