import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user";

@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  desc: string;

  @Column
  body: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  author: User;
}
