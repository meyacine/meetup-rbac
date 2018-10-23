import { PermissionDTO } from '../permission/permission.dto';
import { Role } from './role.entity';

export class RoleDTO {
    name: string;
    displayName: string;
    description: string;
    permissions: PermissionDTO[];

    constructor(role: Role) {
        Object.assign(this, role);
        this.permissions = role.permissions ? role.permissions.map(permission => new PermissionDTO(permission)) : [];
    }
}