import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import Parser from 'rss-parser';
import jsdom from 'jsdom'
import indexRouter from './routes/index';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);

export default app;
