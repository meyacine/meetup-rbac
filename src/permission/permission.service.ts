import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {Permission} from './permission.entity';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission)
                private readonly permissionRepository: Repository<Permission>) {
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async findOne(name: string): Promise<Permission> {
        return await this.permissionRepository.findOne({where: [{name}]});
    }

    async save(permission: Permission): Promise<Permission> {
        return await this.permissionRepository.save(permission);
    }

    async delete(permission: Permission): Promise<DeleteResult> {
        return await this.permissionRepository.delete(permission);
    }
}
