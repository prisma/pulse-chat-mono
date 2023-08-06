import express, { Application } from 'express';
import authRouter from './routes/auth.route';

const app: Application = express();
const PORT: number = 3001;

app.use('/auth', authRouter)

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});