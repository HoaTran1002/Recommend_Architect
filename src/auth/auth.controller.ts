import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
    @Post('signup')
    signup(@Body() signUpDto: SignUpDto){
        return signUpDto
    }
    @Post('signin')
    signin(@Body() signInDto: SignInDTO){
        return signInDto
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
