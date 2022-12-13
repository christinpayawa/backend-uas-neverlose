import Product from '../model/ProductModel.js';
import path from "path";
import fs from "fs";

export const getProduct = async (req, res) => {
    try {
        // SELECT * FROM product
        const response = await Pet.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async (req, res) => {
    try {
        // SELECT * FROM product WHERE id = ?
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createProduct = (req, res) => {
    // INSERT INTO product VALUES (...)
    if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });
    const { name, price, rating, sold, des, productId } = req.body;
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
          await Product.create({
            image: fileName,
            url: url,
            name: name,
            rating: rating,
            sold: sold,
            des: des,
            price: price,
            productId: productId,
          });
          res.status(201).json({ msg: "Pet Created Successfuly" });
        } catch (error) {
          console.log(error.message);
        }
    });
}

export const updatePet = async (req, res) => {
    // UPDATE product SET (...) WHERE id = ?
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!pet) return res.status(404).json({ msg: "No Data Found" });
  
    let fileName = "";
    if (req.files === null) {
      fileName = product.image;
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
    const { name, rating, sold, des, price, productId } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
    try {
      await Product.update(
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
    // DELETE FROM product WHERE id = ?
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
  
    try {
      const filepath = `./public/images/${product.image}`;
      fs.unlinkSync(filepath);
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Product Deleted Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
};