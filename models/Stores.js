const {Schema, model} = require('mongoose');

const newStore = new Schema({
    Comercio: {type: String, required: true},
    CUIT: {type: String, required: true},
    Concepto: {type: Array, required: true},
    BalanceActual: {type: Number, required: true},
    Activo: {type: String, required: true},
    UltimaVenta: {type: Date, default: Date.now()}
})

module.exports = model('Store', newStore)

