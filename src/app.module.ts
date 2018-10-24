import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './security/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './security/permissions.guard';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        PermissionModule,
        RoleModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, {provide: APP_GUARD, useClass: PermissionsGuard}],
})
export class AppModule {
}
