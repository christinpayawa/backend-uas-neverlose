import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Pet = db.define('pet', {
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    sold: DataTypes.INTEGER,    
    des: DataTypes.STRING,
    price: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Pet;

(async() => {
    await db.sync();
})();