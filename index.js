import express  from "express";
import routes from "./server/routes.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => console.log('listening on port 3001'));
