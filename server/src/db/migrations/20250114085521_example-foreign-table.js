/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const {
  createOnUpdateTrigger,
  dropOnUpdateTrigger,
  createUpdateAtTriggerFunction,
  dropUpdatedAtTriggerFunction,
} = require("../util/db-util");

exports.up = async function (knex) {
  if (!(await knex.schema.hasTable("example_foreign_table"))) {
    await knex.schema.createTable("example_foreign_table", (t) => {
      t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
      t.string("name").notNullable();
      t.string("authMethod");
      t.timestamps(true, true, true);
    });

    await createUpdateAtTriggerFunction(knex);
    // needed to auto update the updated_at column
    await createOnUpdateTrigger(knex, "example_foreign_table");
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  if (await knex.schema.hasTable("example_foreign_table")) {
    await knex.schema.dropTable("example_foreign_table");
    await dropOnUpdateTrigger(knex, "example_foreign_table");
    await dropUpdatedAtTriggerFunction(knex);
  }
};
