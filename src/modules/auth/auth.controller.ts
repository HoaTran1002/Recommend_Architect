import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { identity } from 'rxjs';
import { LogoutDto } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    const response = await this.authServices.signUp(signUpDto);
    return response;
  }
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    const response = await this.authServices.signIn(signInDto);
    return response;
  }
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const response = await this.authServices.refreshToken(refreshTokenDto);
    return response;
  }
  @Post('logout')
  async logout(@Req() req, @Body() logoutDto: LogoutDto) {
    const response = await this.authServices.logout(
      logoutDto.id,
      req.headers.authorization,
    );
    return response;
  }
}
