import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UsersDB from './user.db';

@Injectable()
export class UserService {
  usersDB: UsersDB;
  constructor() {
    this.usersDB = new UsersDB();
  }

  create(createUserDto: CreateUserDto) {
    return this.usersDB.addUser(createUserDto);
  }

  findAll() {
    return this.usersDB.getAllUsers();
  }

  findOne(id: string) {
    return this.usersDB.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersDB.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersDB.deleteUser(id);
  }
}
