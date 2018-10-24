import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './security/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './security/permissions.guard';
import { CustomExceptionFilter } from './core/exceptions/exception.filter';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        PermissionModule,
        RoleModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService,
        {provide: APP_GUARD, useClass: PermissionsGuard},
        {provide: APP_FILTER, useClass: CustomExceptionFilter},
    ],
})
export class AppModule {
}
