import express from 'express';
import bodyParser from 'body-parser';
import Userrouter from "./routes/userRoutes";
import Productrouter from "./routes/productRoutes";
import Orderrouter from './routes/orderRoutes';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes';
import rateLimit from 'express-rate-limit';

dotenv.config();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

const app = express();
app.use(limiter);
app.use(bodyParser.json({ limit: '10kb' }));
var cors = require("cors");
dotenv.config();
app.use(cors());
app.options("*", cors());
const http = require("url");
const API_VERSION = "/api/v1"; 

app.use(API_VERSION, Userrouter);
app.use(API_VERSION, Productrouter);
app.use(API_VERSION,Orderrouter)
app.use(API_VERSION,paymentRoutes)
export default app; 
