import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from 'src/common/constants/env.constants';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { BlacklistTokenService } from 'src/modules/blacklist-token/blacklist-token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, 
        private readonly jwtService: JwtService, 
        private readonly blacklistTokenService: BlacklistTokenService
    ) {}

    async signUp(signUpDto: SignUpDto) {
        const newUser = await this.userService.createUser(signUpDto);

        const jwtPayload: JwtPayload = {
            id: newUser.id,
            email: newUser.email,
            userName: newUser.userName,
            role: newUser.role,
        };
        console.log(newUser.id)
        const accessToken = await this.generateAccessToken(jwtPayload);
        const refreshToken = await this.generateRefreshToken(jwtPayload);

        await this.userService.updateUserRefreshToken(newUser.id, refreshToken);
        return { newUser, accessToken, refreshToken };
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.userService.findOneByEmail(signInDto.email);
        if (!user) {
            throw new NotFoundException(`Not found user by email ${signInDto.email}`);
        }

        const matchPassword = await bcrypt.compare(signInDto.password, user.password);
        if (!matchPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const jwtPayload: JwtPayload = {
            id: user.id,
            email: user.email,
            userName: user.userName,
            role: user.role,
        };

        const accessToken = await this.generateAccessToken(jwtPayload);
        const refreshToken = await this.generateRefreshToken(jwtPayload);

        await this.userService.updateUserRefreshToken(user.id, refreshToken);
        return { user, accessToken, refreshToken };
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        const jwtPayload = await this.verifyRefreshToken(refreshTokenDto.refresh_token);
        
        const user = await this.userService.findOneByUserId(jwtPayload.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.refresh_token !== refreshTokenDto.refresh_token) {
            throw new UnauthorizedException('Refresh token is invalid');
        }

        const accessToken = await this.generateAccessToken(jwtPayload);
        const refreshToken = await this.generateRefreshToken(jwtPayload);
        await this.userService.updateUserRefreshToken(jwtPayload.id, refreshToken);
        return { accessToken, refreshToken };
    }

    async generateAccessToken(jwtPayload: JwtPayload) {
        return this.jwtService.signAsync(jwtPayload, {
            secret: ACCESS_TOKEN_SECRET_KEY,
            expiresIn: '60s',
        });
    }

    async generateRefreshToken(jwtPayload: JwtPayload) {
        return this.jwtService.signAsync(jwtPayload, {
            secret: REFRESH_TOKEN_SECRET_KEY,
            expiresIn: '7d',
        });
    }

    async verifyAccessToken(accessToken: string): Promise<JwtPayload> {
        try {
            return await this.jwtService.verifyAsync(accessToken, {
                secret: ACCESS_TOKEN_SECRET_KEY,
            });
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Access token has expired');
            } else {
                throw new UnauthorizedException('Access token is not valid');
            }
        }
    }

    async verifyRefreshToken(refreshToken: string): Promise<JwtPayload> {
        try {
            return await this.jwtService.verifyAsync(refreshToken, {
                secret: REFRESH_TOKEN_SECRET_KEY,
            });
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Refresh token has expired');
            } else {
                throw new UnauthorizedException('Refresh token is not valid');
            }
        }
    }

    async logout(id: string, authorization: string) {
        await this.userService.deleteRefreshToken(id);
        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        
        const accessToken = authorization.replace('Bearer ', '');
        const isBlacklisted = await this.blacklistTokenService.isTokenBlacklisted(accessToken);
        
        if (isBlacklisted) {
            return { message: 'User already logged out.' };
        }

        return await this.blacklistTokenService.addTokenToBlacklist(accessToken);
    }
}
