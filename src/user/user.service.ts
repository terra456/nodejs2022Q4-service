import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserI } from '../types';
import { PrismaService } from '../database/prisma.service';
import { User, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const d = new Date(Date.now());
    return await this.prisma.user.create({
      data: {
        id: randomUUID(),
        version: 1,
        createdAt: d.toISOString(),
        updatedAt: d.toISOString(),
        ...createUserDto,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: {
        ...updateUserDto,
      },
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
