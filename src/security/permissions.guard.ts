import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { UserDTO } from '../user/user.dto';
import { flatten, map } from 'lodash';
import { PermissionEnum } from '../permission/permission.enum';
import { SecurityException } from './security.exception';
import { Properties } from '../properties';
import { RoleDTO } from '../role/role.dto';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        // Get decorator required permissions if it's defined
        const requiredPermissions = this.reflector.get<PermissionEnum[]>('permissions', context.getHandler());
        if (!requiredPermissions) { // No permission required, continue to controller execution
            return true;
        }
        // Get the HTTP request
        const request = context.switchToHttp().getRequest();

        // Extract Authorization header from the request
        const bearer = request.headers.authorization;

        // No bearer : Stop execution
        if (!bearer) {
            throw new SecurityException('no bearer was found', HttpStatus.UNAUTHORIZED, 'Authentication rejection');
        }


        // if we can not decode the token, a SecurityException is thrown
        const user = this.extractUser(bearer);
        if (!user) {
            throw new SecurityException('could not extract user from bearer', 401, 'Authentication rejection');
        }
        const userPermissions = this.getUserPermissions(user);

        const isAuthorized = this.hasPermission(userPermissions, requiredPermissions);

        if (!isAuthorized) {
            throw new SecurityException('UserNotAuthorized', HttpStatus.UNAUTHORIZED, `required ${JSON.stringify(requiredPermissions)} not found`);
        }
        return isAuthorized;
    }

    private getUserPermissions(user: UserDTO): PermissionEnum[] {
        return flatten(map(user.roles, role => this.getPermissionsNames(role)));
    }

    private getPermissionsNames(role: RoleDTO): PermissionEnum[] {
        return map(role.permissions, permission => permission.name);
    }

    private extractUser(bearer: string): UserDTO {
        try {
            return jwt.verify(bearer.replace('Bearer ', ''), Properties.JWT_SIGN_KEY) as UserDTO;
        } catch (e: Error) {
            throw new SecurityException('InvalidToken', HttpStatus.UNPROCESSABLE_ENTITY, e.message);
        }
    }

    private hasPermission(userPermissions: PermissionEnum[], requiredPermissions: PermissionEnum[]): boolean {
        return userPermissions.some(userPermission => (requiredPermissions.includes(userPermission.toString())));
    }
}