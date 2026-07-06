import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    baseUrl,
    database: 'mongodb://localhost:27017/octofit_db',
  });
});

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
  });
}

void startServer();