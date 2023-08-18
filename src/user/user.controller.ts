import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Response } from 'express';
import { User } from '@prisma/client';

function formatUserData(data: User) {
  return {
    id: data.id,
    login: data.login,
    version: data.version,
    createdAt: Date.parse(data.createdAt.toString()),
    updatedAt: Date.parse(data.updatedAt.toString()),
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user: User = await this.userService.create(createUserDto);
      if (user) {
        console.log(user);
        res.status(HttpStatus.CREATED).json(formatUserData(user));
      } else {
        res.status(HttpStatus.FORBIDDEN).send();
      }
    } catch {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = (await this.userService.findAll()).map((el) => {
      return formatUserData(el);
    });
    res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findOne(id);
      if (user) {
        res.status(HttpStatus.OK).json(formatUserData(user));
      } else {
        res.status(HttpStatus.NOT_FOUND).send(`User ${id} not found`);
      }
    } catch {
      res.status(HttpStatus.FORBIDDEN).send();
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
        });
        res.status(HttpStatus.OK).json(formatUserData(newUser));
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
    try {
      await this.userService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`User ${id} not found`);
    }
  }
}
