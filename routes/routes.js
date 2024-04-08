import express from 'express';
import { registerView, registerUser } from '../controllers/registerController.js';
import { loginView, loginUser } from '../controllers/loginController.js';
import { startView } from '../controllers/startController.js';
import { protectRoute } from '../auth/protect.js';
import { dashboardView } from '../controllers/dashboardController.js';

export const router = express.Router();

router.get('/', startView);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard', protectRoute, dashboardView);

router.post('/register', registerUser)
router.post('/login', loginUser)

