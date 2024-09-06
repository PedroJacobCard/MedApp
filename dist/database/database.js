"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_CONNECT)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Connection error:", error.message);
});
const db = mongoose_1.default.connection;
exports.default = db;
