import { uuid } from "drizzle-orm/gel-core";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("User", {
  id: varchar({ length: 36 }).notNull().primaryKey(),
  name: varchar({ length: 40 }).notNull(),
  email: varchar({ length: 40 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});
