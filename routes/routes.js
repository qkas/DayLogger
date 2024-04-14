import express from 'express';
import { registerView, registerUser } from '../controllers/registerController.js';
import { loginView, loginUser, logoutUser } from '../controllers/loginController.js';
import { protectRoute } from '../auth/protect.js';
import { dashboardView, postMood } from '../controllers/dashboardController.js';
import { memoriesView } from '../controllers/memoriesController.js';

export const router = express.Router();

router.get('/', protectRoute, dashboardView);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/memories', protectRoute, memoriesView)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/dashboard', postMood)
