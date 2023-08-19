import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.findByLogin(login);
    const isPasswordRight = await bcrypt.compare(pass, user.password);
    if (!isPasswordRight) {
      throw new UnauthorizedException('Password is wrong');
    } else {
      const token = await this.jwtService.signAsync({
        userId: user.id,
        login: user.login,
      });
      return { accessToken: token };
    }
  }

  async signUp(signUnDto: SignInDto): Promise<any> {
    const { password, ...user } = await this.userService.create(signUnDto);
    return user;
  }

  async delAll(): Promise<any> {
    return await this.userService.removeMany();
  }
}
