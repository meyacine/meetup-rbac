import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionDTOMapper } from './permission.dto.mapper';

@Module({
    imports: [
        TypeOrmModule.forFeature([Permission]),
    ],
    providers: [
        PermissionService,
        PermissionDTOMapper,
    ],
    controllers: [PermissionController],
})
export class PermissionModule {
}
