import ImageModel from './ImageModel';
import TagModel from './TagModel';
import UserModel from '../../auth/models/UserModel';
import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);

const Image = ImageModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

module.exports = (sequelize, type) => {

    const Post = sequelize.define('post', {
        title: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "name es requerido"
                },
            },
        },
        name: {
            type: type.STRING,
        },
        breed: {
            type: type.STRING,
        },
        color: {
            type: type.STRING,
        },
        type: {
            type: type.STRING,
        },
        size: {
            type: type.STRING,
        },
        age: {
            type: type.STRING,
        },
        genre: {
            type: type.STRING,
        },
        genre: {
            type: type.STRING,
        },
        description: {
            type: type.TEXT,
        },
        date: {
            type: type.DATEONLY,
        },
        phone: {
            type: type.BIGINT,
        },
        address: {
            type: type.STRING,
        },
        latitude: {
            type: type.DECIMAL(10, 2),
        },
        longitude: {
            type: type.DECIMAL(10, 2),
        },
        views: {
            type: type.INTEGER,
            defaultValue: 0
        },
        likes: {
            type: type.INTEGER,
            defaultValue: 0
        },
    }, {
        paranoid: true,
        timestamps: true
    })

    Post.belongsTo(User, {
        as: 'user_post',
        foreignKey: {
            name: 'user_post_id'
        },
        references: {
            model: User,
            key: 'id'
        }
    });

    Post.belongsTo(Image, {
        foreignKey: {
            name: 'image_id'
        },
        references: {
            model: Image,
            key: 'id'
        }
    });

    const Comment = sequelize.define('comments', {
        content: {
            type: type.TEXT
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    Comment.belongsTo(Image, {
        foreignKey: {
            name: 'image_id'
        },
        references: {
            model: Image,
            key: 'id'
        }
    });

    Post.belongsToMany(User, {
        through: Comment,
        foreignKey: 'post_id'
    });
    User.belongsToMany(Post, {
        through: Comment,
        foreignKey: 'user_id'
    });

    Post.belongsToMany(Tag, {
        through: 'tags_post',
        foreignKey: 'post_id'
    });
    Tag.belongsToMany(Post, {
        through: 'tags_post',
        foreignKey: 'user_id'
    });

    return Post

}
