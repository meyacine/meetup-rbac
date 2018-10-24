import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { Permissions } from '../security/permissions.decorator';
import { PermissionEnum } from '../permission/permission.enum';
import { map } from 'lodash';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    @Permissions(PermissionEnum.LIST_USERS)
    async findAll() {
        const users = await this.userService.findAll();
        return map(users, user => new UserDTO(user));
    }

    @Get(':username')
    @Permissions(PermissionEnum.GET_USER)
    async findOne(@Param() params) {
        const user = await this.userService.findByName(params.username);
        return new UserDTO(user);
    }
}
