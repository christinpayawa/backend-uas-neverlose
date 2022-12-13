import express from 'express';
import {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAnjing,
    getKucing,
    getBurung,
    getHewanMungil,
} from '../controller/Product.js';

const router = express.Router();

router.get('/product', getProduct);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get("/anjing", getAnjing);
router.get("/kucing", getKucing);
router.get("/burung", getBurung);
router.get("/hewan_mungil", getHewanMungil);

export default router;