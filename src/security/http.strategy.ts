import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/user.dto';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(token: any, done: Function): Promise<UserDTO> {
        const user = await this.authService.validateUser(token);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
