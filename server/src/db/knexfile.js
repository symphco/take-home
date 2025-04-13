const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../../.env")});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgres",
    connection: {
      connectionString: process.env.DB_CONNECTION_URI,
    },
  },
};
