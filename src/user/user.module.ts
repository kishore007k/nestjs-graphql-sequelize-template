import { Module } from "@nestjs/common";
import { userProvider } from "./user.provider";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  providers: [UserResolver, UserService, ...userProvider],
})
export class UserModule {}
