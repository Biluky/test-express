import { eq, sql } from "drizzle-orm";
import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import { BIZ_CODE } from "../constants/business-code";
import { HTTP_STATUS } from "../constants";
import { success, fail } from "../utils";
import { getPaginationParams, paginateResult } from "../utils/pagination";
import type { AuthRequest } from "../types";

function omitPassword(user: Record<string, unknown>) {
  const { password: _, ...rest } = user;
  return rest;
}

export async function listUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { page, pageSize, offset, limit } = getPaginationParams(req.query);
    const [all, [{ count }]] = await Promise.all([
      db.select().from(users).offset(offset).limit(limit),
      db.select({ count: sql<number>`count(*)` }).from(users),
    ]);
    const result = paginateResult(all.map(omitPassword), Number(count), page, pageSize);
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) {
      fail(res, "User not found", BIZ_CODE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    success(res, omitPassword(user));
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { username, password, email, phone, realName, avatar, gender, status, homePage } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db
      .insert(users)
      .values({ username, password: hashedPassword, email, phone, realName, avatar, gender, status, homePage })
      .returning();
    success(res, omitPassword(user), "created", BIZ_CODE.SUCCESS, HTTP_STATUS.CREATED);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const updates: Record<string, unknown> = {};
    for (const key of ["email", "phone", "realName", "avatar", "gender", "status", "homePage"]) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    if (Object.keys(updates).length === 0) {
      fail(res, "No fields to update", BIZ_CODE.VALIDATION_ERROR);
      return;
    }
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    if (!user) {
      fail(res, "User not found", BIZ_CODE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    success(res, omitPassword(user));
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const [user] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    if (!user) {
      fail(res, "User not found", BIZ_CODE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    success(res, null, "deleted");
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [user] = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id))
      .returning();
    if (!user) {
      fail(res, "User not found", BIZ_CODE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    success(res, null, "Password reset successfully");
  } catch (err) {
    next(err);
  }
}
