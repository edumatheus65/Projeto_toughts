const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts2', 'root', 'M@nu1301', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso')
} catch (error) {
    console.log('Não foi possível conectar')
}

module.exports = sequelize