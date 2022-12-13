import Kategori from '../model/KategoriModel.js';

export const getKategori = async (req, res) => {
    try {
        const response = await Kategori.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.messagge);
    }
}

export const getKategoriById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error.messagge);
    }
}

export const createKategori = async (req, res) => {
    try {
        await Product.create(req.body);
        res.status(201).json({ msg: 'Kategori Created'})
    } catch (error) {
        console.log(error.messagge);
    }
}

export const updateKategori = async (req, res) => {
    try {
        await Kategori.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: 'Kategori Updated'});
    } catch (error) {
        console.log(error.messagge);
    }
}

export const deleteKategori = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: 'Kategori Deleted'})
    } catch (error) {
        console.log(error.messagge);
    }
}