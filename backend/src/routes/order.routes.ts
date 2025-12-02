import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt.verifyToken, authJwt.isStaff);

router.post('/', orderController.createOrder);
router.get('/:id', orderController.findOrderDetails);

export default router;