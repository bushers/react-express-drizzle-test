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
import { eq } from "drizzle-orm";

const app = express();

const corsOptions = {
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const data = await DB.select().from(person);
    res.json({ message: "Fetched users", data: data });
  } catch (error) {
    res.json({ message: "There was an error", data: null });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { userCountry, userName } = req.body;
    const data = await DB.insert(person).values({ userName, userCountry });

    console.log(data);

    res.json({ message: "User added", data: data });
  } catch (error) {
    res.json({ message: "There was an error", data: null });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && typeof id === "string") {
      const data = await DB.update(person)
        .set({ ...req.body })
        .where(eq(person.id, parseInt(id)));
      res.json({ message: "User deleted", data: data });
    } else {
      res.json({ message: "Invalid user ID", data: null });
    }
  } catch (error) {
    res.json({ message: "There was an error", data: null });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && typeof id === "string") {
      const data = await DB.delete(person).where(eq(person.id, parseInt(id)));
      res.json({ message: "User deleted", data: data });
    } else {
      res.json({ message: "Invalid user ID", data: null });
    }
  } catch (error) {
    res.json({ message: "There was an error", data: null });
  }
});

app.listen(3005, () => {
  console.log("api listening on port 3005");
});
