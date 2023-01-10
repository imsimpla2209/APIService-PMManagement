/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { UserType } from '../../common/enums/common.enum';

const RolesGuard = (role: UserType): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate  {
        async canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return user?.jobTitle.includes(role);
        }
    }
    return mixin(RoleGuardMixin);
}

export default RolesGuard;