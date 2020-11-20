const express = require('express');
const productsController = require('./../controllers/productsController');
const router = express.Router();

router
  .route('/')
  .post(productsController.createProdcuts)
  .get(productsController.getAllProducts);
router.route('/:id')
.get(productsController.getProductById)
.patch(productsController.updateProduct)
.delete(productsController.deleteProduct)

module.exports = router;
