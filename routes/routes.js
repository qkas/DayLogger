import express from 'express';
import { registerView, registerUser } from '../controllers/registerController.js';
import { loginView, loginUser } from '../controllers/loginController.js';
import { startView } from '../controllers/startController.js';
import { protectRoute } from '../auth/protect.js';
import { dashboardView, postMood } from '../controllers/dashboardController.js';
import { memoriesView } from '../controllers/memoriesController.js';

export const router = express.Router();

router.get('/', startView);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard', protectRoute, dashboardView);
router.get('/memories', protectRoute, memoriesView)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/dashboard', postMood)
