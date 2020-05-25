import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

import Photo from "../models/Photo";

class PhotoController {
  public async getPhotos(req: Request, res: Response): Promise<Response<JSON>> {
    const photos = await Photo.find();

    return res.json({
      photos,
    });
  }

  public async getPhoto(req: Request, res: Response): Promise<Response<JSON>> {
    const { id } = req.params;

    const photo = await Photo.findById(id);

    return res.json({
      photo,
    });
  }

  public async createPhoto(
    req: Request,
    res: Response
  ): Promise<Response<JSON>> {
    const { title, description } = req.body;
    const { path } = req.file;

    const newPhoto = {
      title,
      description,
      imagePath: path,
    };

    const photo = new Photo(newPhoto);
    await photo.save();

    return res.json({
      message: "Photo Successfully Saved",
      photo,
    });
  }

  public async updatePhoto(
    req: Request,
    res: Response
  ): Promise<Response<JSON>> {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatePhoto = await Photo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    return res.json({
      updatePhoto,
    });
  }

  public async deletePhoto(
    req: Request,
    res: Response
  ): Promise<Response<JSON>> {
    const { id } = req.params;

    const photo = await Photo.findByIdAndDelete(id);

    if (photo) {
      fs.unlinkSync(path.join(photo.imagePath));
    }

    return res.json({
      message: "Photo Deleted!",
      photo,
    });
  }
}

const photoController = new PhotoController();
export default photoController;
