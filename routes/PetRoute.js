import express from 'express';
import {
    getPet,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    getAnjing,
    getKucing,
    getBurung,
    getHewanMungil,
} from '../controller/Pet.js';

const router = express.Router();

router.get('/pet', getPet);
router.get('/pet/:id', getPetById);
router.post('/pet', createPet);
router.patch('/pet/:id', updatePet);
router.delete('/product/:id', deletePet);
router.get("/anjing", getAnjing);
router.get("/kucing", getKucing);
router.get("/burung", getBurung);
router.get("/hewan_mungil", getHewanMungil);

export default router;