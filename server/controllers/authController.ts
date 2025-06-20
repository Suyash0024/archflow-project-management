// server/src/controllers/authController.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';
import { ObjectId } from 'mongoose';
import crypto from 'crypto'; // Node.js built-in crypto module
// import sendEmail from '../utils/sendEmail'; // Explicitly NOT USED as per request

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

const generateToken = (id: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            res.status(400).json({ message: 'User already exists with this email or username' });
            return;
        }

        const user = await User.create({
            username,
            email,
            password,
        }) as IUser & { _id: ObjectId };

        if (user) {
            res.status(201).json({
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password') as (IUser & { _id: ObjectId }) | null;

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    if (req.user) {
        const userWithId = req.user as IUser & { _id: ObjectId };
        res.json({
            _id: userWithId._id.toString(),
            username: userWithId.username,
            email: userWithId.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            // Send generic message to prevent username enumeration,
            // but for a truly insecure setup, it's still a risk.
            res.status(200).json({ success: true, message: 'If an account with that username exists, the reset token would be provided.' });
            return;
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour expiration

        await user.save({ validateBeforeSave: false });

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

        // --- INSECURE: DIRECTLY RETURNING THE RESET TOKEN/URL ---
        // This is highly dangerous and should NEVER be done in production.
        // The token MUST be sent via a secure channel (like email to the registered address).
        res.status(200).json({
            success: true,
            message: 'Password reset token generated.',
            resetToken: resetToken, // The plain token
            resetUrl: resetUrl       // The complete reset URL
        });
        // --- END INSECURE CODE ---

    } catch (error: any) {
        console.error('Server error during forgot password request:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const resetTokenParam = req.params.token;
    if (!resetTokenParam) {
        res.status(400).json({ message: 'Reset token is missing from the URL.' });
        return;
    }

    const hashedToken = crypto.createHash('sha256').update(resetTokenParam).digest('hex');
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        res.status(400).json({ message: 'New password must be at least 6 characters long.' });
        return;
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        }).select('+password');

        if (!user) {
            res.status(400).json({ message: 'Invalid or expired password reset token.' });
            return;
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, message: 'Password has been successfully reset.' });
    } catch (error: any) {
        console.error('Server error during password reset:', error);
        res.status(500).json({ message: 'Server error. Could not reset password.' });
    }
};