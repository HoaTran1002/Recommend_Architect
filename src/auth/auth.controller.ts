import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDTO } from './dto/signIn.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService){}
    
    @Post('signUp')
    signUp(@Body() signUpDto: SignUpDto){
        return signUpDto
    }
    @Post('signIn')
    async signIn(@Body() signInDto: SignInDTO){
        const res = await this.authServices.signIn()
        return res
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