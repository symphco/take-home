module.exports.createOnUpdateTrigger = async (knex, tableName) => {
  const triggerExists = await knex.raw(`
      SELECT EXISTS (
        SELECT 1 
        FROM pg_trigger 
        WHERE tgname = '${tableName}_updatedAt'
      );
    `);

  if (!triggerExists?.rows?.[0]?.exists) {
    return knex.raw(`
        CREATE TRIGGER "${tableName}_updatedAt"
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE on_update_timestamp();
      `);
  }

  return null;
};

module.exports.dropOnUpdateTrigger = (knex, tableName) =>
  knex.raw(`DROP TRIGGER IF EXISTS "${tableName}_updatedAt" ON "${tableName}";`);

module.exports.createUpdateAtTriggerFunction = (knex) =>
  knex.raw(`
CREATE OR REPLACE FUNCTION on_update_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW."updatedAt" = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`);

module.exports.dropUpdatedAtTriggerFunction = (knex) =>
  knex.raw(`
DROP FUNCTION IF EXISTS on_update_timestamp() CASCADE;
`);
