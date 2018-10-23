import { Permission } from './permission.entity';

export class PermissionDTO {

    name: string;
    displayName: string;
    description: string;

    constructor(permission: Permission) {
        Object.assign(this, permission);
    }
}
