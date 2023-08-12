import { randomUUID } from 'crypto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdatePasswordDto, UserI, UserSequreI } from 'src/types';
import { UpdateUserDto } from '../user/dto/update-user.dto';

class UserRecord implements UserI {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(createUserDto: CreateUserDto) {
    this.id = randomUUID();
    this.login = createUserDto.login;
    this.password = createUserDto.password;
    this.version = 1; // integer number, increments on update
    this.createdAt = Date.now(); // timestamp of creation
    this.updatedAt = this.createdAt;
  }

  getUser(): UserI {
    return {
      id: this.id,
      login: this.login,
      password: this.password,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateUserData(updateUserDto: UpdateUserDto): UserSequreI {
    // this.login = updateUserDto.login;
    this.version += 1;
    this.updatedAt = Date.now();
    return this.getUser();
  }

  updateUserPassword(newPassword: string) {
    this.password = newPassword;
    this.version += 1;
    this.updatedAt = Date.now();
  }
}

class UsersDB {
  users: UserRecord[];
  constructor() {
    this.users = [];
  }

  public async addUser(createUserDto: CreateUserDto) {
    const user = new UserRecord(createUserDto);
    this.users.push(user);
    return user.getUser();
  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.users[ind].updateUserData(updateUserDto);
      return this.users[ind].getUser();
    }
  }

  public async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.users[ind].updateUserPassword(updatePasswordDto.newPassword);
      return this.users[ind].getUser();
    }
  }

  public async deleteUser(id: string) {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.users.splice(ind, 1);
      return 'deleted';
    }
  }

  public async getUserById(id: string): Promise<UserI> {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      return null;
    } else {
      return this.users[ind].getUser();
    }
  }

  public async getAllUsers() {
    return this.users.map((el) => el.getUser());
  }
}

export default UsersDB;
