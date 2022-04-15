import { sequelize } from "config/sequelizeConfig";
import { Post } from "database/models/post";
import { User } from "database/models/user";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: () => {
      sequelize.addModels([User, Post]);
      sequelize.sync({ logging: console.log, force: false });
      return sequelize;
    },
  },
];
