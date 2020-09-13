module.exports = (sequelize, type) => {

    const Tag = sequelize.define('tag', {
        name: {
            type: type.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "name es requerido"
                },
            },
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    return Tag

}
