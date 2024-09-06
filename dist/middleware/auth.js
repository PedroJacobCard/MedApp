"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authSecret_1 = __importDefault(require("../config/authSecret"));
function default_1(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        jsonwebtoken_1.default.verify(token, authSecret_1.default.secret);
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: "Ivalid token." });
    }
}
