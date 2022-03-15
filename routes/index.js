const {Router} = require('express')
const { deleteStore } = require('./stores/DELETE');
const { getStoresFromDB } = require('./stores/GET');
const { postStore } = require('./stores/POST');
const router = Router();

router.get('/api/stores/:limit/:page', getStoresFromDB)
router.post('/api/stores', postStore);
router.delete('/api/stores/:ID', deleteStore);

module.exports = router