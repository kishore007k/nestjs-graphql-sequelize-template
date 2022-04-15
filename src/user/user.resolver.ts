import { CreateUserInputDto } from "./dto/inputs/create-user-input.dto";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./dto/args/user.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => String)
  hello() {
    return this.usersService.getHello();
  }

  @Query(() => [User])
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Mutation(() => User)
  create(@Args("createUser") createUser: CreateUserInputDto) {
    return this.usersService.create(createUser);
  }
}
