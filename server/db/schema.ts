import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const person = sqliteTable("Person", {
  id: integer("id"),
  userName: text("userName"),
  userCountry: text("userCountry"),
});
