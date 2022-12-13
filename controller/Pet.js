import Pet from '../model/PetModel.js';
import path from "path";
import fs from "fs";

export const getPet = async (req, res) => {
    try {
        // SELECT * FROM pet
        const response = await Pet.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPetById = async (req, res) => {
    try {
        // SELECT * FROM pet WHERE id = ?
        const response = await Pet.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPet = (req, res) => {
    // INSERT INTO pet VALUES (...)
    if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });
    const { name, price, rating, sold, des, petId } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
          await Pet.create({
            image: fileName,
            url: url,
            name: name,
            rating: rating,
            sold: sold,
            des: des,
            price: price,
            petId: petId,
          });
          res.status(201).json({ msg: "Pet Created Successfuly" });
        } catch (error) {
          console.log(error.message);
        }
    });
}

export const updatePet = async (req, res) => {
    // UPDATE pet SET (...) WHERE id = ?
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!pet) return res.status(404).json({ msg: "No Data Found" });
  
    let fileName = "";
    if (req.files === null) {
      fileName = pet.image;
    } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];
  
      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
  
      const filepath = `./public/images/${pet.image}`;
      fs.unlinkSync(filepath);
  
      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const { name, rating, sold, des, price, petId } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
    try {
      await Pet.update(
        { image: fileName, url: url, name: name, rating: rating, sold: sold, des: des, price: price, petId: petId, },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ msg: "Pet Updated Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deletePet = async (req, res) => {
    // DELETE FROM pet WHERE id = ?
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!pet) return res.status(404).json({ msg: "No Data Found" });
  
    try {
      const filepath = `./public/images/${pet.image}`;
      fs.unlinkSync(filepath);
      await Pet.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Product Deleted Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
};