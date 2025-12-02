import { Router } from 'express';
import * as customerController from '../controllers/customer.controller';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt.verifyToken, authJwt.isStaff);

router.post('/', customerController.createCustomer);
router.get('/', customerController.findAllCustomers);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

export default router;