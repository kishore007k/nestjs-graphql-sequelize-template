import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "./databaseConfig";

const sequelizeConfig = () => {
  let config: any;
  switch (process.env.NODE_ENV) {
    case "prod":
    case "production":
      config = databaseConfig.production;
    case "dev":
    case "development":
      config = databaseConfig.development;
    default:
      config = databaseConfig.development;
  }

  return new Sequelize(config);
};

export const sequelize = sequelizeConfig();
