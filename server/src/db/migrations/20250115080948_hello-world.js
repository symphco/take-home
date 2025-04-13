const {
  createOnUpdateTrigger,
  dropOnUpdateTrigger,
} = require("../util/db-util");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (!(await knex.schema.hasTable("example_table"))) {
    await knex.schema.createTable("example_table", (t) => {
      t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
      t.bigInteger("accessTokenTTL").defaultTo(7200).notNullable();
      t.bigInteger("accessTokenMaxTTL").defaultTo(7200).notNullable();
      t.bigInteger("accessTokenNumUsesLimit").defaultTo(0).notNullable();
      t.jsonb("accessTokenTrustedIps").notNullable();
      t.timestamps(true, true, true);
      t.uuid("identityId").notNullable().unique();
      t.foreign("identityId").references("id").inTable("example_foreign_table").onDelete("CASCADE");
      t.string("type").notNullable();
      t.string("stsEndpoint").notNullable();
      t.string("allowedPrincipalArns").notNullable();
      t.string("allowedAccountIds").notNullable();
    });

    // needed to auto update the updated_at column
    await createOnUpdateTrigger(knex, "example_table");
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  if (await knex.schema.hasTable("example_table")) {
    await knex.schema.dropTable("example_table");
    await dropOnUpdateTrigger(knex, "example_table");
  }
};
