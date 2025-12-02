import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt.verifyToken);

router.get('/search', authJwt.isStaff, productController.searchProducts);
router.get('/', authJwt.isStaff, productController.findAllProducts);

router.post('/', authJwt.isAdmin, productController.createProduct);
router.put('/:id', authJwt.isAdmin, productController.updateProduct);
router.put('/status/:id', authJwt.isAdmin, productController.toggleStatus);

export default router;
