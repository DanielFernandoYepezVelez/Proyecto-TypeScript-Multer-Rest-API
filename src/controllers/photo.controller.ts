import { Request, Response } from "express";

import Photo from "../models/Photo";

class PhotoController {
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
}

const photoController = new PhotoController();
export default photoController;
