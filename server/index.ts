import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("sqlite.db");
export const DB: BetterSQLite3Database = drizzle(sqlite);

import express from "express";
import cors from "cors";
import { person } from "./db/schema.js";

const app = express();

const corsOptions = {
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,POST",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const data = await DB.select().from(person);
    console.log(data);
    res.json({ message: "Fetched users", data: data });
  } catch (error) {
    res.json({ message: "There was an error", data: null });
  }
});

app.listen(3005, () => {
  console.log("api listening on port 3005");
});
