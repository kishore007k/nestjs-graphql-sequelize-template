import * as dotenv from "dotenv";

dotenv.config();

interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: boolean | Function;
  force: boolean;
  timezone: string;
  jwtPrivateKey?: string;
}

interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
}

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: "postgres",
    password: "123456789",
    database: "test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    logging: false,
    force: false,
    timezone: "+02:00",
    jwtPrivateKey: process.env.JWTKEY || "",
  },
  production: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
    force: true,
    timezone: "+02:00",
  },
  test: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: true,
    force: true,
    timezone: "+02:00",
  },
};
