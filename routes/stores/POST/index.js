const Store = require('../../../models/Stores')

const postStore = async (req, res) => {
    const {ID, Comercio, CUIT, Concepto, BalanceActual, Activo, UltimaVenta} = req.body;
    const newStore = new Store({ID, Comercio, CUIT, Concepto, BalanceActual, Activo, UltimaVenta});

    if(typeof Comercio !== 'string'){
        res.status(404).json({message: 'El nombre del comercio no cumple con el formato requerido, debe ser una String.'})
    }
    if(typeof CUIT !== 'string'){
        res.status(404).json({message: 'El numero de CUIT no cumple con el formato requerido, debe ser una String.'})
    }
    if(typeof Concepto !== 'object'){
        res.status(404).json({message: 'El campo Concepto no cumple con el formato requerido. Debe ser un arreglo de objetos, por ejemplo: [{"Concepto 1": 100, {"Concepto 2": 120}'})
    }
    if(typeof BalanceActual !== 'number'){
        res.status(404).json({message: 'El numero del Balance Actual no cumple con el formato requerido, debe ser un numero.'})
    }
    if(typeof Activo !== 'boolean'){
        res.status(404).json({message: 'Activo no cumple con el formato requerido, debe ser true o false.'})
    }
   
    await newStore.save();

    res.json({message: 'Store Saved'})
}

module.exports = {postStore}