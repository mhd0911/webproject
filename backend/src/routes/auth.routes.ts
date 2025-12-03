import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.get('/test', authJwt.verifyToken, (req, res) => {
  res.status(200).send({ message: 'Token hợp lệ!' });
});

export default router;
