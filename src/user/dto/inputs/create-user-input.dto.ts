import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsEmail } from "class-validator";

@InputType()
export class CreateUserInputDto {
  // Input Type is used to validate the data coming from the client
  // Add the @Field decorator to each field to make it available in the GraphQL schema
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  readonly password: string;
}
