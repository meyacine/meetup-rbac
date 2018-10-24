import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {SecurityException} from './security.exception';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    public async login(@Body() body, @Res() res) {
        if (!body) throw new SecurityException('missingInformation', HttpStatus.BAD_REQUEST, 'Missing information in body');
        if (!body.username) throw new SecurityException('missingUsername', HttpStatus.BAD_REQUEST, 'Missing username');
        if (!body.password) throw new SecurityException('missingPassword', HttpStatus.BAD_REQUEST, 'Missing password');

        const token = await this.authService.signin(body);
        res.status(HttpStatus.ACCEPTED).json('Bearer ' + token);
    }
}