import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    async findAll(): User[] {
        return await this.userService.findAll();
    }

    @Get(':username')
    async findOne(@Param() params): User {
        return await this.userService.findByName(params.username);
    }
}
