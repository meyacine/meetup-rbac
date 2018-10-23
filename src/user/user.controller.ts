import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    async findAll(): UserDTO[] {
        const users = await this.userService.findAll();
        return users.map(user => new UserDTO(user));
    }

    @Get(':username')
    async findOne(@Param() params): UserDTO {
        const user = await this.userService.findByName(params.username);
        return new UserDTO(user);
    }
}
