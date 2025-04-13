import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();
import { db } from "./db/knex";

//middleware
app.use(cors());
app.use(express.json());

/*
##################################################
||                                              ||
||              Example endpoints               ||
||                                              ||
##################################################
*/

// Root endpoint - Returns a simple hello world message and default client port
app.get("/", async (_req, res) => {
  res.json({ hello: "world", "client-default-port": 3000 });
});

// GET /examples - Fetches all records from the example_foreign_table
app.get("/examples", async (_req, res) => {
  const docs = await db("example_foreign_table").select("*");
  res.json({ docs });
});

// POST /examples - Creates a new record with auth method and name, returns the created document
app.post("/examples", async (req, res) => {
  const { authMethod, name } = req.body;
  const [doc] = await db("example_foreign_table")
    .insert({
      authMethod,
      name,
    })
    .returning("*");
  res.json({ doc });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
