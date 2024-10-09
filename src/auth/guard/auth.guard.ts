import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authServices: AuthService){}
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
        const payload = await this.authServices.verifyAccessToken(accessToken)
        if(!payload){
            return false
        }
        return true
    }
}