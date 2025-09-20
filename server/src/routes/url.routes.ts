
import { Router } from "express";
import UrlRepository from "../repository/url/url.repository";
import { UrlService } from "../services/url/url.services";
import { UrlController } from "../controller/url/url.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);


const apiRouter = Router();
apiRouter.post("/urls", authMiddleware, urlController.create.bind(urlController));
apiRouter.get("/urls", authMiddleware, urlController.list.bind(urlController));

const redirectRouter = Router();
redirectRouter.get("/:code", urlController.redirect.bind(urlController));

export { apiRouter, redirectRouter };


