import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const d = Date.now() - 1000;
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        version: 1,
        createdAt: new Date(d),
        updatedAt: new Date(d),
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

  async findByLogin(login: string) {
    return this.prisma.user.findFirst({
      where: { login },
    });
  }

  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: {
        ...updateUserDto,
        updatedAt: new Date(Date.now()),
        version: { increment: 1 },
      },
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
