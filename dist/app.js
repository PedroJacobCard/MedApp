"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const database_1 = __importDefault(require("./database/database"));
const cors_1 = __importDefault(require("cors"));
const allowsOrigin_1 = __importDefault(require("./config/allowsOrigin"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        database_1.default;
        this.middleware();
        this.routes();
    }
    middleware() {
        this.server.use((0, cors_1.default)({
            origin: (origin, callback) => {
                if (allowsOrigin_1.default.indexOf(origin) !== -1 || !origin) {
                    return callback(null, true);
                }
                else {
                    callback(new Error('Not alloewd by CORS'));
                }
            },
            credentials: true,
            optionsSuccessStatus: 200,
            methods: 'GET, HEAD, PUT, POST, DELETE',
            allowedHeaders: 'Content-Type, Authorization'
        }));
        this.server.use(express_1.default.json());
    }
    routes() {
        this.server.use(router_1.router);
    }
}
exports.default = new App().server;
