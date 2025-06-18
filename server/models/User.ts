// archflow-backend/src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Define an interface for your User document
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>; // Add method to interface
}

// 2. Define the Mongoose Schema
const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 3. Pre-save hook to hash password
UserSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 4. Method to compare password (attached to the schema)
UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 5. Export the Mongoose Model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;