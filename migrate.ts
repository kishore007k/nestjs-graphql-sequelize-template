import * as dotenv from "dotenv";
dotenv.config();

import * as childProcess from "child_process";
import * as Promise from "bluebird";
import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage } from "umzug";

import { Umzug } from "umzug";
import { databaseConfig } from "./config/databaseConfig";

const DB_NAME = process.env.DB_NAME_DEVELOPMENT;
const DB_USER = process.env.DB_USER;

let config: any;

switch (process.env.NODE_ENV) {
  case "prod":
  case "production":
    config = databaseConfig.production;
  case "dev":
  case "development":
    config = databaseConfig.development;
  case "test":
    config = databaseConfig.test;
  default:
    config = databaseConfig.development;
}

const sequelize = new Sequelize(config);

const umzug = new Umzug({
  migrations: {
    glob: "./database/migrations/*.js",
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const logUmzugEvent = (eventName: string) => (name: any) =>
  console.log(`${name} ${eventName}`);

umzug.on("migrating", logUmzugEvent("migrating 🏃"));
umzug.on("migrated", logUmzugEvent("migrated 💃"));
umzug.on("reverting", logUmzugEvent("reverting 🧑‍🦼"));
umzug.on("reverted", logUmzugEvent("reverted 🧑‍🦽"));

const cmdStatus = async () => {
  let result = {
    executed: [],
    pending: [],
  } as any;

  const rs = await umzug
    .executed()
    .then(executed => {
      result.executed = executed;
      return umzug.pending();
    })
    .then(pending => {
      result.pending = pending;
      return umzug.executed();
    });

  console.log({ ex: result.executed, pd: result.pending });

  return rs;
};

const cmdMigrate = async () => {
  await umzug.up();
};

const cmdMigrateNext = () => {
  return umzug.pending().then(pending => {
    if (pending.length === 0) {
      return Promise.reject(new Error("No pending migrations"));
    }
    const next = pending[0].name;
    return umzug.up({ to: next });
  });
};

const cmdReset = () => {
  return umzug.down();
};

const cmdResetPrev = () => {
  return umzug.executed().then(executed => {
    if (executed.length === 0) {
      return Promise.reject(new Error("Already at initial state"));
    }

    const prev = executed[executed.length - 1].name;

    return umzug.down({ to: prev });
  });
};

const cmdHardReset = () => {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      try {
        console.log(`dropdb ${DB_NAME}`);
        childProcess.spawnSync(`dropdb ${DB_NAME}`);
        console.log(`createdb ${DB_NAME} --username ${DB_USER}`);
        childProcess.spawnSync(`createdb ${DB_NAME} --username ${DB_USER}`);
        resolve();
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  });
};

const cmd = process.argv[2].trim();

let executedCmd: any;

console.log(`${cmd.toUpperCase()} BEGIN 🚀`);

switch (cmd) {
  case "status":
    executedCmd = cmdStatus();
    break;

  case "up":
  case "migrate":
    executedCmd = cmdMigrate();
    break;

  case "next":
  case "migrate-next":
    executedCmd = cmdMigrateNext();
    break;

  case "down":
  case "reset":
    executedCmd = cmdReset();
    break;

  case "prev":
  case "reset-prev":
    executedCmd = cmdResetPrev();
    break;

  case "reset-hard":
    executedCmd = cmdHardReset();
    break;

  default:
    console.log(`invalid cmd: ${cmd}`);
    process.exit(1);
}

executedCmd
  .then((result: any) => {
    const doneStr = `${cmd.toUpperCase()} DONE 🎉`;
    console.log(doneStr);
    console.log(
      "==============================================================================",
    );
  })
  .catch((err: any) => {
    const errorStr = `${cmd.toUpperCase()} ERROR 😥`;
    console.log(errorStr);
    console.log(
      "==============================================================================",
    );
    console.log(err);
    console.log(
      "==============================================================================",
    );
  })
  .then(() => {
    if (cmd !== "status" && cmd !== "reset-hard") {
      return cmdStatus();
    }
    return Promise.resolve();
  })
  .then(() => process.exit(0));
