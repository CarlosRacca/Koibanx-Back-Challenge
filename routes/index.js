const { text } = require('body-parser');
const {Router} = require('express')


const router = Router();

const Store = require('../models/Stores')

router.get('/api/stores/:limit/:page', async (req, res) => {
    
    const stores = await Store.find();
    const formattedStores = [];

    const {page, limit} = req.params
    const storesTotal = stores.length

    for(i = 0; i < stores.length; i++){
        let date = stores[i].UltimaVenta;
        let formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

        

        let store = {
            ID: stores[i]._id,
            Comercio: stores[i].Comercio,
            CUIT: stores[i].CUIT,
            Concepto: stores[i].Concepto,
            BalanceActual: '$ ' + stores[i].BalanceActual,
            Activo: stores[i].Activo ? "Sí" : "No",
            UltimaVenta: formattedDate
        }

        if(page > 0){
            if(i < limit * page && i >= limit * page - limit){
                formattedStores.push(store)
                console.log(formattedStores.length)
            };
        };
    };
  
    res.json({
        data: formattedStores,
        page: parseInt(page),
        limit: parseInt(limit),
        total: storesTotal,
        pages: Math.ceil(storesTotal/limit)
    });
});

router.post('/api/stores', async (req, res) => {
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
        res.status(404).json({message: 'El numero del BalanceActual no cumple con el formato requerido, debe ser un numero.'})
    }
    if(typeof Activo !== 'boolean'){
        res.status(404).json({message: 'Activo no cumple con el formato requerido, debe ser true o false.'})
    }
   
    await newStore.save();

    res.json({message: 'Store Saved'})
});

router.delete('/api/stores/:ID', async (req, res) => {
    const store = await Store.findByIdAndDelete(req.params.ID);

    res.json(store);
});




module.exports = router