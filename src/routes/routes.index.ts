import { Router } from "express";

import multer from "../libs/multer";
import photoController from "../controllers/photo.controller";

class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.post(
      "/create",
      multer.single("image"),
      photoController.createPhoto
    );
  }
}

const indexRouter = new IndexRoutes();
export default indexRouter.router;
