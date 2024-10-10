import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from 'src/common/constants';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { BlacklistTokenService } from 'src/blacklist-token/blacklist-token.service';

@Injectable()
export class AuthService {
    constructor(private readonly userServices: UserService, private readonly jwtServices: JwtService, private readonly blacklistTokenService: BlacklistTokenService){}
    async signUp(signUpDto: SignUpDto){
        const newUser = await this.userServices.createUser(signUpDto)
    
        const jwtPayload:JwtPayload = {
            id: newUser.id,
            email: newUser.email,
            userName: newUser.userName,
            role: newUser.role
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
            userName: userExist.userName,
            role: userExist.role
        }

        const accessToken = await this.generateAccessToken(jwtPayload)
        const refreshToken = await this.generateRefreshToken(jwtPayload)

        await this.userServices.updateUserRefreshToken(userExist.id,refreshToken)
        const userIfor = await this.userServices.findOneByEmail(signInDto.email)
        return {userIfor,accessToken,refreshToken}
    }
    async refreshToken(refreshTokenDto: RefreshTokenDto){
        const jwtPayload = await this.verifyRefreshToken(refreshTokenDto.refresh_token)
        
        const userExist = await this.userServices.findOneByUserId(jwtPayload.id)

        if(!(userExist.refresh_token === refreshTokenDto.refresh_token)){
            throw new UnauthorizedException('Refresh token is invalid');
        }

        if(!userExist){
            throw new NotFoundException('')
        }
        const accessToken = await this.generateAccessToken(jwtPayload)
        const refreshToken = await this.generateRefreshToken(jwtPayload)
        await this.userServices.updateUserRefreshToken(jwtPayload.id,refreshToken)
        return {accessToken,refreshToken}
    }
    async generateAccessToken(jwtPayload:JwtPayload){
        const payload:JwtPayload = {
            id: jwtPayload.id,
            userName:jwtPayload.userName,
            email: jwtPayload.email,
            role: jwtPayload.role
        };
        const token = await this.jwtServices.signAsync(payload,{
            secret: ACCESS_TOKEN_SECRET_KEY,
            expiresIn: '60s'
        })
        return token
    }
    async generateRefreshToken(jwtPayload:JwtPayload){
        const payload:JwtPayload = {
            id: jwtPayload.id,
            userName:jwtPayload.userName,
            email: jwtPayload.email,
            role: jwtPayload.role
        };
        const token = await this.jwtServices.signAsync(payload,{
            secret: REFRESH_TOKEN_SECRET_KEY,
            expiresIn: '7d'
        })
        return token
    }
    async verifyAccessToken(accessToken:string):Promise<JwtPayload>{
        const privateKey = ACCESS_TOKEN_SECRET_KEY
        try {
            const jwtPayload:JwtPayload = await this.jwtServices.verifyAsync(
                accessToken,
                {
                    secret: privateKey
                }
            )
            return jwtPayload
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Refresh token has expired');
            } else {
                throw new UnauthorizedException('Refresh token is not valid');
            }
        }

    }
    async verifyRefreshToken(refreshToken:string){
        const privateKey = REFRESH_TOKEN_SECRET_KEY
        try {
            const jwtPayload:JwtPayload = await this.jwtServices.verifyAsync(
                refreshToken,
                {
                    secret: privateKey
                }
            )
            return jwtPayload
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Refresh token has expired');
            } else {
                throw new UnauthorizedException('Refresh token is not valid');
            }
        }

    }
    async logout(id:string,authorization:string){
        await this.userServices.deleteRefreshToken(id)
        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        const accessToken = authorization.replace('Bearer ', '');
        const isBlacklisted = await this.blacklistTokenService.isTokenBlacklisted(accessToken);
    
        if (isBlacklisted) {
            return { message: 'User already logged out.' };
        }
        const response = await this.blacklistTokenService.addTokenToBlacklist(accessToken);
        return response
    }
}
