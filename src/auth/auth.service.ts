import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { varsEnv } from 'src/config/env.config';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from 'src/user/user.constants';

@Injectable()
export class AuthService {
    constructor(private readonly userServices: UserService, private readonly jwtServices: JwtService){}
    async signUp(signUpDto: SignUpDto){
        const newUser = await this.userServices.createUser(signUpDto)
    
        const jwtPayload:JwtPayload = {
            id: newUser.id,
            email: newUser.email,
            userName: newUser.userName
        }

        const accessToken = await this.generateAccessToken(jwtPayload)
        const refreshToken = await this.generateRefreshToken(jwtPayload)

        await this.userServices.updateUserRefreshToken(newUser.id,refreshToken)
        return {newUser,accessToken, refreshToken}
    }
    async signIn(signInDto: SignInDto){
        const userExist = await this.userServices.findOneByEmail(signInDto.email)
        if(!userExist){
            throw new NotFoundException(`Not found user by email ${signInDto.email}`)
        }

        const matchPassword = await bcrypt.compare(signInDto.password, userExist.password)
        if(!matchPassword){
            throw new UnauthorizedException('Invalid credentials');
        }

        const jwtPayload:JwtPayload = {
            id: userExist.id,
            email: userExist.email,
            userName: userExist.userName
        }

        const accessToken = await this.generateAccessToken(jwtPayload)
        const refreshToken = await this.generateRefreshToken(jwtPayload)

        await this.userServices.updateUserRefreshToken(userExist.id,refreshToken)
        const userIfor = await this.userServices.findOneByEmail(signInDto.email)
        return {userIfor,accessToken,refreshToken}
    }
    async refreshToken(){

    }
    async generateAccessToken(jwtPayload:JwtPayload){
        const token = await this.jwtServices.signAsync(jwtPayload,{
            secret: ACCESS_TOKEN_SECRET_KEY,
            expiresIn: '60s'
        })
        return token
    }
    async generateRefreshToken(jwtPayload:JwtPayload){
        const token = await this.jwtServices.signAsync(jwtPayload,{
            secret: REFRESH_TOKEN_SECRET_KEY,
            expiresIn: '7d'
        })
        return token
    }
    async verifyAccessToken(accessToken:string):Promise<JwtPayload>{
        const privateKey = ACCESS_TOKEN_SECRET_KEY
        const jwtPayload:JwtPayload = await this.jwtServices.verifyAsync(
            accessToken,
            {
                secret: privateKey
            }
        )
        return jwtPayload
    }
    async verifyRefreshToken(refreshToken:string){
        const privateKey = REFRESH_TOKEN_SECRET_KEY
        const jwtPayload:JwtPayload = await this.jwtServices.verifyAsync(
            refreshToken,
            {
                secret: privateKey
            }
        )
        return jwtPayload
    }
    
}
