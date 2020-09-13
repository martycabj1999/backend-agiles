module.exports = (sequelize, type) => {

    const Image = sequelize.define('image', {
        url_image: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "url_image es requerido"
                },
            },
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    return Image

}
