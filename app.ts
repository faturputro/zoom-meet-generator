import express, { NextFunction, Response, Request } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import { SERVER_PORT } from './app.config';
import routes from './src/routes';

dotenv.config()

const app = express();

app.use(
  helmet({
    frameguard: {
      action: 'deny',
    },
  })
);
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.removeHeader('X-Powered-By');
  next();
});
app.use(morgan('combined'));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '2mb',
  }),
);
app.use(bodyParser.json({ limit: '2mb' }));

app.use('/api', routes);
app.use((req, res, next) => {
  const error: any = new Error('Not found');
  error.status = 404;
  next(error);
});
// @ts-ignore
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`);
});
