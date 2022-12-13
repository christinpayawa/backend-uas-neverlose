import express from 'express';
import FileUpload from "express-fileupload";
import cors from 'cors';
import PetRoute from './routes/PetRoute.js';
import ProductRoute from './routes/ProductRoute.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(PetRoute);
app.use(ProductRoute);


app.listen(8080, () => console.log('Server Up and Running...'));