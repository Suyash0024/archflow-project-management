// archflow-backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Import IUser for type checking
import dotenv from 'dotenv';
import { ObjectId } from 'mongoose'; // Import ObjectId for explicit typing if needed

dotenv.config();

// Helper function to generate JWT
const generateToken = (id: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined.');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            res.status(400).json({ message: 'User already exists with this email or username' });
            return;
        }

        // Create new user (password hashing handled by pre-save hook in User model)
        const user = await User.create({
            username,
            email,
            password,
        }) as IUser & { _id: ObjectId };

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                // Fix for user._id: Ensure it's treated as an ObjectId or string
                token: generateToken(user._id.toString()), // Convert ObjectId to string
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Check if user exists by email
        const user = await User.findOne({ email }) as IUser & { _id: ObjectId };

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                // Fix for user._id: Ensure it's treated as an ObjectId or string
                token: generateToken(user._id.toString()), // Convert ObjectId to string
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user profile (example of a protected route)
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    // req.user is populated by the protect middleware
    // We already have `declare global` in authMiddleware.ts
    // to extend the Request object with `user?: IUser`.
    // We need to ensure that `req.user` is indeed present and not null/undefined.
    if (req.user) {
        res.json({
            _id: (req.user as IUser & { _id: ObjectId })._id.toString(), // Add .toString() for consistency and explicit string conversion
            username: req.user.username,
            email: req.user.email,
        });
    } else {
        // This case should theoretically not be hit if the `protect` middleware works correctly
        // and always attaches `req.user` or sends a 401.
        // However, it's good practice for type safety.
        res.status(404).json({ message: 'User not found' });
    }
};