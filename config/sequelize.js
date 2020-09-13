import Sequelize from 'sequelize';
import moment from 'moment';

//SECURITY
import UserModel from '../src/modules/auth/models/UserModel'
import RoleModel from '../src/modules/auth/models/RoleModel'

//PET
import ImageModel from '../src/modules/pet/models/ImageModel'
import TagModel from '../src/modules/pet/models/TagModel'
import PostModel from '../src/modules/pet/models/PostModel'

import {
    DBURL
} from './index'

import bcryptjs from "bcryptjs";

const sequelize = new Sequelize(DBURL);

//AUTH
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

//PET
const Image = ImageModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);


sequelize.sync()
    .then(async () => {
        console.log('Conexion con MySql mediante Sequelize')
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync('123123', salt);

        await Role.create({
            name: 'admin',
        });
        await Role.create({
            name: 'user',
        });

        await User.create({
            email: 'admin@gmail.com',
            username: 'admin',
            password: hashPassword,
            points: 532,
            role_id: 1,
            active: 1,
        });
    })




export default sequelize