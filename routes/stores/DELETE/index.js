const Store = require('../../../models/Stores')

const deleteStore = async (req, res) => {
    const store = await Store.findByIdAndDelete(req.params.ID);

    res.json(store);
};

module.exports = {deleteStore}