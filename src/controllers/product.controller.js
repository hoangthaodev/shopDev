'use strict'

const { SuccessResponse } = require("../core/success.response")
const ProductService = require("../services/product.service")


class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata: await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    // update Product
    updateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update Product success!',
            metadata: await ProductService.updateProduct(req.body.product_type, req.params.productId, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    publishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'publishProductByShop success!',
            metadata: await ProductService.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            })
        }).send(res)
    }

    unPublishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'unPublishProductByShop success!',
            metadata: await ProductService.unPublishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            })
        }).send(res)
    }

    // query //
    getAllDraftForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'getAllDraftForShop success!',
            metadata: await ProductService.findAllDraftForShop({
                product_shop: req.user.userId
            })
        }).send(res)
    }

    getAllPublishedForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'getAllPublishedForShop success!',
            metadata: await ProductService.findAllPublishedForShop({
                product_shop: req.user.userId
            })
        }).send(res)
    }

    getListSearchProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'getListSearchProduct success!',
            metadata: await ProductService.searchProducts(req.params)
        }).send(res)
    }

    findAllProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'getListSearchProduct success!',
            metadata: await ProductService.findAllProducts(req.query)
        }).send(res)
    }

    findProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'getListSearchProduct success!',
            metadata: await ProductService.findProducts({
                product_id: req.params.product_id
            })
        }).send(res)
    }

    //end query //
}

module.exports = new ProductController()