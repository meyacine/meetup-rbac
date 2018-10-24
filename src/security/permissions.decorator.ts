import { ReflectMetadata } from '@nestjs/common';
import {PermissionEnum} from '../permission/permission.enum';

export const Permissions = (...permissions: PermissionEnum[]) => ReflectMetadata('permissions', permissions);
