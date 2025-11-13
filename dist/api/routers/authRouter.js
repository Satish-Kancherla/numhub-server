import { Router } from "express";
import { signupValidator } from "../validators/signup-validator.js";
import { authController } from "../controllers/authController.js";
import { signinValidator } from "../validators/signin-validator.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
export const authRouter = Router();
authRouter.post("/signin", signinValidator, authController.signin);
authRouter.post("/signup", signupValidator, authController.signup);
authRouter.get("/me", AuthMiddleware, authController.me);
//# sourceMappingURL=authRouter.js.map