import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

@ObjectType()
export class User {
  // GraphQL Object Type is used to define the GraphQL schema
  // Add the @Field decorator to each field to make it available in the GraphQL schema

  @Field(() => ID, { defaultValue: "0" })
  @IsString()
  @IsOptional()
  readonly id?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly alias?: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  readonly isActive?: boolean;
}
