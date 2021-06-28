import express from 'express';
import cors from "cors";
import compression from 'compression';
import { initialize } from './socket/socket';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(compression());


const PORT = process.env.PORT || 5000;

// init socket
const httpServer = initialize(app);


httpServer.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});