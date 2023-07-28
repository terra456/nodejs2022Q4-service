import { randomUUID } from "crypto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserI, UserSequreI } from "src/types";
import { UpdateUserDto } from "./dto/update-user.dto";

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
    this.updatedAt = null;
  }

  getUser(): UserSequreI {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  checkUserPassword(password: string): Boolean {
    return password === this.password;
  }

  updateUserData(updateUserDto: UpdateUserDto): UserSequreI {
    if (this.checkUserPassword(updateUserDto.password)) {
      this.login = updateUserDto.login;
      this.version += 1;
      this.updatedAt = Date.now();
      return this.getUser();
    } else {
      throw new Error('Password incorrect');
    }
  }
}

class UsersDB {
  users: UserRecord[];
  constructor() {
    this.users = [];
  }

  public addUser(createUserDto: CreateUserDto) {
    const user = new UserRecord(createUserDto);
    console.log(user);
    this.users.push(user);
    return user.getUser();
  }

  public updateUser(id: string, updateUserDto: UpdateUserDto) {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      throw new Error(`User ${id} not found`);
    } else {
      this.users[ind].updateUserData(updateUserDto);
    }
  }

  public deleteUser(id: string) {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      throw new Error(`User ${id} not found`);
    } else {
      this.users.splice(ind, 1);
    }
  }

  public getUserById(id: string) {
    const ind = this.users.findIndex((user) => user.id === id);
    if (ind < 0) {
      throw new Error(`User ${id} not found`);
    } else {
      return this.users[ind].getUser();
    }
  }

  public getAllUsers() {
    return this.users.map((el) => el.getUser());
  }
}

export default UsersDB;