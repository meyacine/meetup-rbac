import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByName(username: string): Promise<User> {
        return await this.userRepository.findOne({where: [{username}], relations: ['roles', 'roles.permissions']});
    }

    async findOne(credentials: { username: string, password: string }): Promise<User> {
        return await this.userRepository.findOne({
            where: [{
                username: credentials.username,
                password: crypto.createHmac('sha256', credentials.password).digest('hex')
            }], relations: ['roles', 'roles.permissions'],
        });
    }
}
