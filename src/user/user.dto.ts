import {User} from './user.entity';
import { RoleDTO } from '../role/role.dto';

export class UserDTO {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    lastLogin: Date;
    enabled: boolean;
    roles: RoleDTO[];

    constructor(user: User) {
        this.username = user.username;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.lastLogin = user.lastLogin;
        this.enabled = user.enabled;
        this.roles = user.roles ? user.roles.map(role => new RoleDTO(role)) : [];
    }
}