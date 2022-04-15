import {
  Table,
  Model,
  Column,
  DataType,
  Length,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { Post } from "./post";

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Length({
    min: 6,
    msg: "Password must be between 6 and 20 characters",
  })
  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @HasMany(() => Post)
  posts: Post[];
}
