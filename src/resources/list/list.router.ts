import { Router } from 'express';
import controllers from './list.controllers';

const router = Router();

// /resources/list
router.route('/').get(controllers.getOne).post(controllers.createOne);

// /resources/list/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
