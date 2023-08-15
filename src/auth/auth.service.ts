import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.findByLogin(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.login,
    });
    return { access_token: token };
  }

  async signUp(signUnDto: SignInDto): Promise<any> {
    const { password, ...user } = await this.userService.create(signUnDto);
    return user;
  }
}
