import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import FileStream from 'fs';

import * as Yup from 'yup';

import imgur from '../config/imgurApi';

const orphanagesRepository = getRepository(Orphanage);

export default {
  async index(request: Request, response: Response) {

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanage);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    //that as is a hack to upload multiple files
    const requestImages = request.files as Express.Multer.File[];

    const images: Array<{ path: string }> = await Promise.all(requestImages.map(async (image) => {
      const file_base64 = FileStream.readFileSync(image.path)
        .toString('base64');

      const { data: { link: uploadedImageUrl } } = await imgur.Image.upload(
        file_base64,
        {
          type: 'base64',
          title: image.filename,
        }
      );
      
      return { path: uploadedImageUrl };
    }));

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      })
      ),
    });

    await schema.validate(data, {
      //show all fields errors
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
}