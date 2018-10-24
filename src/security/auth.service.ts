import * as jwt from 'jsonwebtoken';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtOptions } from './jwt.options';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/user.dto';
import { SecurityException } from './security.exception';
import { Properties } from '../properties';

@Injectable()
export class AuthService {

    // FIXME: new JwtOptions({....})
    private _options: JwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: process.env.JWT_ID || 'test',
    };

    constructor(private readonly userService: UserService) {
    }

    public async signin(credentials: { username: string, password: string }): Promise<string> {
        const user = await this.userService.findOne(credentials);

        if (!user) throw new SecurityException('notFound', HttpStatus.UNAUTHORIZED, 'User not found');

        // FIXME: when i pass a Typed Object JwtOptions the method it crash causing InternalServerError,
        // that's why i'm passing a simple Object this._options
        return await jwt.sign({...new UserDTO(user)}, Properties.JWT_SIGN_KEY, this._options);
    }
}