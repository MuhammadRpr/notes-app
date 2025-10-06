import express from 'express';
import { testConnection } from './config/db.js';
import helloRouter from './routes/helloRoute.js';
import notesRouter from './routes/notesRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(helloRouter);
app.use(notesRouter);

const port = 3000;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection();
});