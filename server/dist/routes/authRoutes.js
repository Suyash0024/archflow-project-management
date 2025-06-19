"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// archflow-backend/src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.get('/profile', authMiddleware_1.protect, authController_1.getUserProfile); // Protected route example
exports.default = router;
