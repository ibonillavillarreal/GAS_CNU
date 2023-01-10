
const ItemController = require('../controllers/ItemController');


const router = require('express').Router();
router.get('/', ItemController.getItem);               
router.get('/:id', ItemController.getItemId);               

module.exports = router;
