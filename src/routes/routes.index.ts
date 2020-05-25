import { Router } from "express";

import multer from "../libs/multer";
import photoController from "../controllers/photo.controller";

class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.get("/photos", photoController.getPhotos);
    this.router.get("/photo/:id", photoController.getPhoto);
    this.router.post(
      "/create",
      multer.single("image"),
      photoController.createPhoto
    );
    this.router.put("/update/:id", photoController.updatePhoto);
    this.router.delete("/delete/:id", photoController.deletePhoto);
  }
}

const indexRouter = new IndexRoutes();
export default indexRouter.router;
