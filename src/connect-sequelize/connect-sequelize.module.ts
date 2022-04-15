import { Module } from "@nestjs/common";
import { databaseProviders } from "./connect-sequelize.providers";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
