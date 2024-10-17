import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { BlacklistTokenService } from "src/modules/blacklist-token/blacklist-token.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authServices: AuthService, private readonly blacklistTokenService: BlacklistTokenService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization']

        if (!authorizationHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const accessToken = authorizationHeader.split(' ')[1]; 
        if (!accessToken) {
            throw new UnauthorizedException('Access token is missing');
        }

        const isBlacklisted = await this.blacklistTokenService.isTokenBlacklisted(accessToken);
       if (isBlacklisted) {
            throw new UnauthorizedException('Access token is blacklisted');
        }

        const payload = await this.authServices.verifyAccessToken(accessToken)
        if(!payload){
            return false
        }
        return true
    }
}