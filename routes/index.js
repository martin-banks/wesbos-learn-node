const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')
// Do work here
const { homepage, addStore,createStore } = storeController
router.get('/', homepage);
router.get('/add', addStore);
router.post('/add', createStore)

module.exports = router;
