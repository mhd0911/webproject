import { Router } from 'express';
import { verifyToken, isAdmin } from '../middlewares/authJwt';

const router = Router();
router.use(verifyToken, isAdmin);
export default router;