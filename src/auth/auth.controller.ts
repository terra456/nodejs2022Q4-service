import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './auth.decorator';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

const saltOrRounds = Number(process.env.CRYPT_SALT) | 10;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpDto: SignInDto) {
    const password = await bcrypt.hash(signUpDto.password, saltOrRounds);
    return this.authService.signUp({ ...signUpDto, password });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  delAll() {
    return this.authService.delAll();
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
