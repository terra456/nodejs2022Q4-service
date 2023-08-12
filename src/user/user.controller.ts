import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  HttpException,
  HttpStatus,
  HttpCode,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserI } from 'src/types';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const user: UserI = await this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = (await this.userService.findAll()).map((res) => {
      return {
        id: res.id,
        login: res.login,
        version: res.version,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };
    });
    res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne(id);
    if (user === null) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.OK).json({
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne(id);
    if (user === null) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      if (user.password === updatePasswordDto.oldPassword) {
        const newUser = await this.userService.updatePassword(id, {
          password: updatePasswordDto.newPassword,
          version: user.version + 1,
        });
        res.status(HttpStatus.OK).json({
          id: newUser.id,
          login: newUser.login,
          version: newUser.version,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        });
      } else {
        throw new HttpException(`Password is wrong`, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.remove(id);
    if (user === null) {
      res.status(HttpStatus.NOT_FOUND).send(`User ${id} not found`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
