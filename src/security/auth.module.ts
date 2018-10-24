import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { HttpStrategy } from './http.strategy';

@Module({
    imports: [UserModule],
    providers: [HttpStrategy],
})
export class AuthModule {
}