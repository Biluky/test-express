import {
  uuid,
  varchar,
  smallint,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).unique(),
  phone: varchar("phone", { length: 20 }),
  realName: varchar("real_name", { length: 50 }),
  avatar: varchar("avatar", { length: 500 }),
  gender: smallint("gender").$type<0 | 1 | 2>(),
  status: smallint("status").$type<0 | 1>().default(1),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  homePage: varchar("home_page", { length: 255 }),
  createTime: timestamp("create_time", { withTimezone: true }).defaultNow().notNull(),
  updateTime: timestamp("update_time", { withTimezone: true }).defaultNow().notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
