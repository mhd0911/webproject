import { Router } from 'express';
import * as statsController from '../controllers/stats.controller';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt.verifyToken, authJwt.isStaff);

router.get('/inventory', statsController.getInventoryStatus);
router.get('/customer-history/:customerId', statsController.getCustomerHistory);

export default router;