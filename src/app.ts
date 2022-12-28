import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

//routes
import userRoutes from './user/user.routes';
import authRoutes from './auth/auth.routes';
import { Path } from './paths';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  public listen(port: number): void {
    this.app.listen(port);
    console.log(`App listening on the port ${port}`);
  }

  public setupRoutes(): void {
    this.app.use(Path.Users, userRoutes);
    this.app.use(Path.Login, authRoutes);
  }

  public setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }
}
