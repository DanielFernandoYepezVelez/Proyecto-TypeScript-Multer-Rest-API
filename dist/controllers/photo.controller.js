"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const Photo_1 = __importDefault(require("../models/Photo"));
class PhotoController {
    getPhotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const photos = yield Photo_1.default.find();
            return res.json({
                photos,
            });
        });
    }
    getPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const photo = yield Photo_1.default.findById(id);
            return res.json({
                photo,
            });
        });
    }
    createPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const { path } = req.file;
            const newPhoto = {
                title,
                description,
                imagePath: path,
            };
            const photo = new Photo_1.default(newPhoto);
            yield photo.save();
            return res.json({
                message: "Photo Successfully Saved",
                photo,
            });
        });
    }
    updatePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description } = req.body;
            const updatePhoto = yield Photo_1.default.findByIdAndUpdate(id, { title, description }, { new: true });
            return res.json({
                updatePhoto,
            });
        });
    }
    deletePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const photo = yield Photo_1.default.findByIdAndDelete(id);
            if (photo) {
                fs_extra_1.default.unlinkSync(path_1.default.join(photo.imagePath));
            }
            return res.json({
                message: "Photo Deleted!",
                photo,
            });
        });
    }
}
const photoController = new PhotoController();
exports.default = photoController;
