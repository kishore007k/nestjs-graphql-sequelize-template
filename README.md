# NestJs-Sequelize-graphQl

This is a template for NestJs, which contains Sequelize with postgres Database, sequelize migration, graphQl and Swagger API Documentation.


## How to create Migration:

Open a new terminal and enter the following command `npx sequelize-cli migration:generate --name <migration-name>` then press Enter.

A migration file will be created inside the **database/migration** folder.

Example:

`npx sequelize-cli migration:generate --name add-firstname`

This command will create a migration file inside the **[database/migration](database/migrations/example-migration.js)** folder with the name *20220415042414-add-firstname* with the timestamp at the front.

For more Migration related doubts go to the Sequelize [Migration](https://sequelize.org/docs/v6/other-topics/migrations/) page.


## Migration Features:

1. To run the migration, open a new terminal and enter the command `npm run migrate status` first to check is there any pending migrations that should be run or not.

1. Running this command will give you a object with keys *ex* (executed) and *pd* (pending).

1. If there is any Migrations pending enter the following command to migrate `npm run migrate up`.

1. to revert all the migrations use `npm run migrate down`. This will revert all the migration that was ever done.

1. To run more than one migration at a time use the `npm run migrate next`, this will run all the migrations.

1. If there was any error in the previous migration you can undo it by `npm run migration prev` or `npm run migrate reset-prev`. This will revert only the last migration.

1. `npm run migrate reset-hard`, this will drops and creates a new table with the same name.