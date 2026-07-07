import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { API_PREFIX, HTTP_STATUS } from "./constants";
import { BIZ_CODE } from "./constants/business-code";
import routes from "./routes";
import { responseMiddleware } from "./middlewares/response.middleware";
import { validationErrorHandler } from "./middlewares/validation-error.middleware";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(responseMiddleware);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use(API_PREFIX, routes);

app.use(validationErrorHandler);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    code: BIZ_CODE.INTERNAL_ERROR,
    message: err.message || "Internal Server Error",
  });
});

export default app;
