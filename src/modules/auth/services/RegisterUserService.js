import Sequelize from 'sequelize';
import UserModel from "../models/UserModel";
import {
    DBURL
} from '../../../../config';
import bcryptjs from "bcryptjs"

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);

/**
 * register user
 *
 * @export
 * @param {string} name
 * @param {string} lastname
 * @param {string} username
 * @param {integer} phone
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
const registerUserService = async function (name, lastname, username, phone, email, password) {

    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
        name,
        lastname,
        username,
        phone,
        email,
        password: hashPassword,
        role_id: 2
    })
        .catch(error => {
            return error
        });

    return user

}

export default registerUserService;
