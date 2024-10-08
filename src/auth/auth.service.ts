import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interface/user-payload.interface';
import { varsEnv } from 'src/config/env.config';

@Injectable()
export class AuthService {
    constructor(private readonly userServices: UserService, private readonly jwtServices: JwtService){}
    async signIn(){
        return this.userServices.findAllUser()
    }
    async signUp(){
        return this.userServices.findAllUser()
    }
    async generateAccessToken(payload:UserPayload){
        return this.jwtServices.sign(payload,{
            secret: varsEnv.secretKeyAccessToken,
            expiresIn: '60s'
        })
    }
    async generateRefreshToken(payload:UserPayload){
        return this.jwtServices.sign(payload,{
            secret: varsEnv.secretKeyRefreshToken,
            expiresIn: '7d'
        })
    }
}
