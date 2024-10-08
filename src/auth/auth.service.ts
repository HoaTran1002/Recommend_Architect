import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { varsEnv } from 'src/config/env.config';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userServices: UserService, private readonly jwtServices: JwtService){}
    async signIn(signInDto: SignInDto){
        
        return signInDto
    }
    async signUp(signUpDto: SignUpDto){
        const newUser = await this.userServices.createUser(signUpDto)
        
        const jwtPayload = newUser
        const accessToken = this.generateAccessToken(jwtPayload)
        return newUser
    }
    async generateAccessToken(payload:JwtPayload){
        return this.jwtServices.sign(payload,{
            secret: varsEnv.secretKeyAccessToken,
            expiresIn: '60s'
        })
    }
    async generateRefreshToken(payload:JwtPayload){
        return this.jwtServices.sign(payload,{
            secret: varsEnv.secretKeyRefreshToken,
            expiresIn: '7d'
        })
    }
}
