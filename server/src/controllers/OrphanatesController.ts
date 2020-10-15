import { request, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanates from '../models/Orphanates';
import orphanateView from '../views/Orphanates_view';
import * as Yup from 'yup';

export default {

    async index(req:Request, res:Response) {
        const orphanatesRepository = getRepository(Orphanates);

        const orphanates = await orphanatesRepository.find({
            relations: ['images']
        });

        return res.json(orphanateView.renderMany(orphanates));
    },

    async show(req:Request, res:Response) {

        const { id } = req.params;
        const orphanatesRepository = getRepository(Orphanates);

        const orphanate = await orphanatesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanateView.render(orphanate));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
    
        const orphanatesRepository = getRepository(Orphanates);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path:image.filename }
        });
    

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanate = orphanatesRepository.create(data);
    
        await orphanatesRepository.save(orphanate);
    
       return res.status(201).json(orphanate);
    }
};