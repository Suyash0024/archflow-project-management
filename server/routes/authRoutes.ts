import { Router } from 'express';
import { registerUser, loginUser, getUserProfile ,  forgotPassword,   resetPassword  } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); 
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
export default router;