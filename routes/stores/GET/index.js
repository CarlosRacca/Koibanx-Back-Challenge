const Store = require('../../../models/Stores')

const getStoresFromDB = async (req, res) => {
    const stores = await Store.find();
    const {page, limit} = req.params;
    const storesTotal = stores.length;
    const filteredStores = stores.splice(limit * page, limit);
    const formattedStores = filteredStores.map(el => {
        let date = el.UltimaVenta;
        let formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

        return{
            ID: el._id,
            Comercio: el.Comercio,
            CUIT: el.CUIT,
            Concepto: el.Concepto,
            BalanceActual: '$ ' + el.BalanceActual,
            Activo: el.Activo ? "Sí" : "No",
            UltimaVenta: formattedDate
        };
    });
  
    res.json({
        data: formattedStores,
        page: parseInt(page),
        limit: parseInt(limit),
        total: storesTotal,
        pages: Math.ceil(storesTotal/limit)
    });
}

module.exports = {getStoresFromDB}