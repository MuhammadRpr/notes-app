import express from 'express';
import { sayHello } from '../handlers/helloHandlers.js';

const helloRouter = express.Router();

helloRouter.get('/', sayHello);

export default helloRouter;