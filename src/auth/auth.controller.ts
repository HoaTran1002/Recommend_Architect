import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService){}
    
    @Post('signUp')
    async signUp(@Body() signUpDto: SignUpDto){
        const response = await this.authServices.signUp()
        return response
    }
    @Post('signIn')
    async signIn(@Body() signInDto: SignInDto){
        const response = await this.authServices.signIn()
        return response
    }
    @Post('refresh-token')
    refreshToken(){
        return
    }
    @Post('logout')
    logout(){
        return 
    }
}
