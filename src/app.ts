import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from "express";
import { router } from "./router";
import db from './database/database';
import cors from 'cors';
import allowsOrigin from './config/allowsOrigin';


class App {
  server: Express;

  constructor() {
    this.server = express();
    db;
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.server.use(cors({
      origin: (origin, callback) => {
        if (allowsOrigin.indexOf(origin as string) !== -1 || !origin) {
          return callback(null, true);
        } else {
          callback(new Error('Not alloewd by CORS'));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
      methods: 'GET, HEAD, PUT, POST, DELETE',
      allowedHeaders: 'Content-Type, Authorization'
    }));

    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(router)
  }
}

export default new App().server;