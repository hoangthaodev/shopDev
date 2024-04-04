'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
router.get('', asyncHandler(productController.findAllProducts))
router.get('/:product_id', asyncHandler(productController.findProducts))

// authentication
router.use(authenticationV2)
//////////////////// 
router.post('', asyncHandler(productController.createProduct))
router.patch('/:productId', asyncHandler(productController.updateProduct))
router.post('/publish/:id', asyncHandler(productController.publishProductByShop))
router.post('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))
// Query //
router.get('/draft/all', asyncHandler(productController.getAllDraftForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishedForShop))

module.exports = router