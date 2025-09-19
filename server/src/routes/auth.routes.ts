
import { Router } from "express";
import { UserRepository } from "../repository/user/user.repository";
import { AuthService } from "../services/auth/auth.services";
import { AuthController } from "../controller/auth/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/auth/register", authController.register.bind(authController));
router.post("/auth/login", authController.login.bind(authController));
router.get("/auth/me", authMiddleware, authController.me.bind(authController));
router.post("/auth/refresh", authController.refresh.bind(authController));
router.post("/auth/logout", authController.logout.bind(authController));


export default router;