"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Import IUser for type checking
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Helper function to generate JWT
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined.');
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = yield User_1.default.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            res.status(400).json({ message: 'User already exists with this email or username' });
            return;
        }
        // Create new user (password hashing handled by pre-save hook in User model)
        const user = yield User_1.default.create({
            username,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                // Fix for user._id: Ensure it's treated as an ObjectId or string
                token: generateToken(user._id.toString()), // Convert ObjectId to string
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if user exists by email
        const user = yield User_1.default.findOne({ email });
        if (user && (yield user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                // Fix for user._id: Ensure it's treated as an ObjectId or string
                token: generateToken(user._id.toString()), // Convert ObjectId to string
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
// @desc    Get user profile (example of a protected route)
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.user is populated by the protect middleware
    // We already have `declare global` in authMiddleware.ts
    // to extend the Request object with `user?: IUser`.
    // We need to ensure that `req.user` is indeed present and not null/undefined.
    if (req.user) {
        res.json({
            _id: req.user._id.toString(), // Add .toString() for consistency and explicit string conversion
            username: req.user.username,
            email: req.user.email,
        });
    }
    else {
        // This case should theoretically not be hit if the `protect` middleware works correctly
        // and always attaches `req.user` or sends a 401.
        // However, it's good practice for type safety.
        res.status(404).json({ message: 'User not found' });
    }
});
exports.getUserProfile = getUserProfile;
