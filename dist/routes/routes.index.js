"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../libs/multer"));
const photo_controller_1 = __importDefault(require("../controllers/photo.controller"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.router.get("/photos", photo_controller_1.default.getPhotos);
        this.router.get("/photo/:id", photo_controller_1.default.getPhoto);
        this.router.post("/create", multer_1.default.single("image"), photo_controller_1.default.createPhoto);
        this.router.put("/update/:id", photo_controller_1.default.updatePhoto);
        this.router.delete("/delete/:id", photo_controller_1.default.deletePhoto);
    }
}
const indexRouter = new IndexRoutes();
exports.default = indexRouter.router;
