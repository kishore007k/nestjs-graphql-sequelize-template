import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
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

  @ApiProperty()
  @Field(() => ID, { defaultValue: "0" })
  @IsString()
  @IsOptional()
  readonly id?: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly alias?: string;

  @ApiProperty()
  @Field(() => String, { nullable: false })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @ApiProperty()
  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  readonly isActive?: boolean;
}
