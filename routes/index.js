const express = require('express');
const storeController = require('../controllers/storeController')
const { catchErrors } = require('../handlers/errorHandlers')

const router = express.Router();

// Do work here
const { homepage, addStore, createStore, getStores, editStore, updateStore } = storeController


router.get('/', catchErrors(getStores))
router.get('/stores', catchErrors(getStores))

router.get('/add', addStore)
router.post('/add', catchErrors(createStore))
router.post('/add/:id', catchErrors(updateStore))

router.get('/store/:id/edit', catchErrors(editStore))

module.exports = router;
