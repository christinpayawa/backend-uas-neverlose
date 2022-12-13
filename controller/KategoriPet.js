import KategoriPet from '../model/PetKategoriModel.js';

export const getKategoriPet = async (req, res) => {
    try {
        const response = await Kategori.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.messagge);
    }
}

export const getKategoriPetById = async (req, res) => {
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

export const createKategoriPet = async (req, res) => {
    try {
        await Pet.create(req.body);
        res.status(201).json({ msg: 'Kategori Created'})
    } catch (error) {
        console.log(error.messagge);
    }
}

export const updateKategoriPet = async (req, res) => {
    try {
        await KategoriPet.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: 'Kategori Updated'});
    } catch (error) {
        console.log(error.messagge);
    }
}

export const deleteKategoriPet = async (req, res) => {
    try {
        await Pet.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: 'Kategori Deleted'})
    } catch (error) {
        console.log(error.messagge);
    }
}