import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { HttpStrategy } from './http.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [HttpStrategy, AuthService],
})
export class AuthModule {
}
