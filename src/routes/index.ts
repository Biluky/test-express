import { Router, type IRouter } from "express";
import { listUsers, getUser, createUser, updateUser, deleteUser, resetPassword } from "../controllers/user";
import { authenticate } from "../middleware/auth";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema, resetPasswordSchema } from "../validators/user.validator";
import { paginationSchema, uuidParamSchema } from "../validators/common.validator";

const router: IRouter = Router();

router.get("/users", authenticate, listUsers);
router.get("/users/:id", authenticate, getUser);
router.post("/users", authenticate, validate({ body: createUserSchema }), createUser);
router.put("/users/:id", authenticate, validate({ body: updateUserSchema }), updateUser);
router.delete("/users/:id", authenticate, deleteUser);
router.put(
  "/users/:id/reset-password",
  authenticate,
  validate({ body: resetPasswordSchema }),
  resetPassword
);

export default router;
