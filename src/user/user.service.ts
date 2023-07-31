import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import db from '../DB';
import type DB from '../DB';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserI } from '../types';

@Injectable()
export class UserService {
  db: typeof DB;
  constructor() {
    this.db = db;
  }

  async create(createUserDto: CreateUserDto): Promise<UserI> {
    return await this.db.user.addUser(createUserDto);
  }

  async findAll() {
    return await this.db.user.getAllUsers();
  }

  async findOne(userId: string) {
    return db.user.getUserById(userId);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.db.user.updateUser(id, updateUserDto);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.db.user.updateUserPassword(id, updatePasswordDto);
  }

  async remove(id: string) {
    return this.db.user.deleteUser(id);
  }
}
