import express from 'express';
import loginHandler from '@/pages/api/login';
import registerHandler from '@/pages/api/register';

const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => loginHandler(req, res));
app.post('/api/register', (req, res) => registerHandler(req, res));

export default app;
