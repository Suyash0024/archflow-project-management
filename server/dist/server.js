"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// archflow-backend/src/server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db")); // Corrected path
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Corrected path
// Load environment variables
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Body parser for JSON
app.use((0, cors_1.default)()); // Enable CORS for all origins (for development)
// Routes
app.use('/api/auth', authRoutes_1.default); // All auth routes will start with /api/auth
// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
