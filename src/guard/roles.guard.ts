import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UseGuards, Inject } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

type ItemRole = 'user' | 'admin' | 'instructor';

@Injectable()
export class RoleGuard implements CanActivate {
    
    private readonly authService: AuthService
    constructor(private roles: ItemRole[]) {}

    setRoles(roles: ItemRole[]) {
        this.roles = roles;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenException('Authorization header not found');
        }

        const accessToken = authorizationHeader.split(' ')[1];
        const payload = await this.authService.verifyAccessToken(accessToken);

        if (!payload || !payload.role || !payload.role.name) {
            throw new ForbiddenException('Access denied: insufficient permissions');
        }

        const roleName = payload.role.name as ItemRole;
        if (!this.roles.includes(roleName)) {
            throw new ForbiddenException('Access denied: insufficient permissions');
        }

        return true;
    }
}


export const Roles = (...roles: ItemRole[]) => {
    const Role = new RoleGuard(roles)
    return UseGuards(Role);
};
