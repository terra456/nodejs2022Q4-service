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
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Response } from 'express';
import { User } from '@prisma/client';
import { UuidValidator } from '../validator/uuid.validator';

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
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
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
  async findOne(@Param() { id }: UuidValidator, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id);
      if (user) {
        res.status(HttpStatus.OK).json(formatUserData(user));
      } else {
        throw new Error();
      }
    } catch {
      // res.status(HttpStatus.FORBIDDEN).send();
      throw new NotFoundException({ message: `User ${id} not found` });
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: UuidValidator,
    @Body(new ValidationPipe()) updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne(id);
    if (user === null) {
      throw new NotFoundException(`User ${id} not found`);
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
  async remove(@Param() { id }: UuidValidator, @Res() res: Response) {
    try {
      await this.userService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
