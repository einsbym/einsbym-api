import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGraphqlGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context);
        const ctx = gqlContext.getContext().req;
        const user = ctx.user;
        const userRole = user.role;
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!requiredRoles || !requiredRoles.includes(userRole)) {
            return false;
        }

        return true;
    }
}
