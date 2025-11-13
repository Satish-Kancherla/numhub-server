import { Router } from "express";
import { formatMiddleware } from "./middlewares/formatMiddlewares";
import { authRouter } from "./routers/authRouter.js";
import { orderRouter } from "./routers/orderRouter.js";
export const mainRouter = Router();
mainRouter.use(formatMiddleware);
mainRouter.use('/auth', authRouter);
mainRouter.use('/orders', orderRouter);
//# sourceMappingURL=mainRouter.js.map