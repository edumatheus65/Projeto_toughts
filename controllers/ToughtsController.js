const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async ShowToughts(req, res) {
        res.render('toughts/home')
    }
}