import { Controller, Get, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

@Controller('permissions')
export class PermissionController {

    constructor(private permissionService: PermissionService) {
    }

    @Get()
    async findAll() {
        return await this.permissionService.findAll();
    }

    @Get(':name')
    async findOne(@Param() params) {
        return await this.permissionService.findOne(params.name);
    }
}
