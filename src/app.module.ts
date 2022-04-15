import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AppService } from "./app.service";
import { DatabaseModule } from "./connect-sequelize/connect-sequelize.module";
import { AppResolver } from "./app/app.resolver";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    // Apollo GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
    }),

    DatabaseModule,
    UserModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
