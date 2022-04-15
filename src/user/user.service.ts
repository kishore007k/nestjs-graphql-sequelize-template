import { Inject, Injectable } from "@nestjs/common";
import { User as UserModel } from "../../database/models/user";
import { User } from "./dto/args/user.dto";
import { CreateUserInputDto } from "./dto/inputs/create-user-input.dto";

@Injectable()
export class UserService {
  // constructor(
  //   @Inject("USER_REPOSITORY")
  //   private readonly userRepository: typeof UserModel,
  // ) {}

  // // to create inside the database
  // async createUser(user: CreateUserInputDto): Promise<User> {
  //   const newUser = await this.userRepository.create(user);
  //   return await newUser.save();
  // }

  // // to get all users from the database
  // async getAllUsers(): Promise<User[]> {
  //   return await this.userRepository.findAll();
  // }

  // Here I'm using the local array to simulate a database
  // In real life, I'd use a database like MongoDB or MySQL
  // to store the users uncomment all the commented code above
  private users: User[] = [];

  getHello(): string {
    return "Hello World!";
  }

  getAll(): User[] {
    return this.users;
  }

  create(user: CreateUserInputDto): User {
    this.users.push(user);
    return user;
  }
}
