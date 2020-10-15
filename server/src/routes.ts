import { Router } from 'express';
import multer from  'multer';

import UploadConfig from './config/upload';
import OrphanatesController from './controllers/OrphanatesController';

const routes = Router();
const upload = multer(UploadConfig);

routes.get('/orphanates', OrphanatesController.index);
routes.get('/orphanates/:id', OrphanatesController.show);
routes.post('/orphanates', upload.array('images') , OrphanatesController.create);

export default routes;

