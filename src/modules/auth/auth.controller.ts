/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth.credential.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('login')
  async singin(@Body() authcredentialDto: AuthCredentialDto) {
    return this.authService.login(authcredentialDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req)
  }
}
