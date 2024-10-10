import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { BlacklistTokenService } from "src/blacklist-token/blacklist-token.service";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly authServices: AuthService, private readonly blacklistTokenService: BlacklistTokenService){}
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization']
        const accessToken = authorizationHeader.split(' ')[1]; 
        const payload = await this.authServices.verifyAccessToken(accessToken)
        if((payload.role =='admin')){
            return false
        }
        return true
    }
}