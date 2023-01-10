/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enums/common.enum';

export const ROLES_KEY = 'jobTitle';
export const Roles = (roles: UserType) => SetMetadata(ROLES_KEY, roles);