'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
router.get('', asyncHandler(productController.findAllProducts))
router.get('/:product_id', asyncHandler(productController.findProducts))

// authentication
router.use(authentication)
//////////////////// 
router.post('', asyncHandler(productController.createProduct))
router.post('/publish/:id', asyncHandler(productController.publishProductByShop))
router.post('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))
// Query //
router.get('/draft/all', asyncHandler(productController.getAllDraftForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishedForShop))

module.exports = router