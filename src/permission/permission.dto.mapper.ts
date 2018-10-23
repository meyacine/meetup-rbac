import { PermissionDTO } from './permission.dto';
import { Permission } from './permission.entity';

export class PermissionDTOMapper {
    public toDTO(permission: Permission): PermissionDTO {
        return !permission ? null : new PermissionDTO(permission);
    }

    public toDTOs(permissions: Permission[]): PermissionDTO[] {
        return !permissions || permissions.length === 0 ? [] : permissions.map(permision => this.toDTO(permision));
    }
}
