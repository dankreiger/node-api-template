import { Router } from 'express';
import controllers from './item.controllers';

const router = Router();

// /resources/item
router.route('/').get(controllers.getMany).post(controllers.createOne);

// /resources/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.deleteOne)
  .put(controllers.updateOne);

export default router;
