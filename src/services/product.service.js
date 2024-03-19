'use strict'

const { product, clothing, electronic, furniture } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')
const { findAllDraftForShop,
    findAllPublishedForShop,
    publishProductByShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProducts,
    updateProductById
} = require('../models/repositories/product.repo')
const { removeUndefineObject, updateNestedObjectParser } = require('../utils')

// define Factory class to create product

class ProductFactory {

    static productRegistry = {} //key - class

    static registryProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {

        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)
        return new productClass(payload).createProduct()

    }

    static async updateProduct(type, productId, payload) {

        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Types ${type}`)
        return new productClass(payload).updateProduct(productId)

    }

    // put //
    static async publishProductByShop({ product_shop, product_id }) {
        return await publishProductByShop({ product_shop, product_id })
    }
    static async unPublishProductByShop({ product_shop, product_id }) {
        return await unPublishProductByShop({ product_shop, product_id })
    }
    //end put//

    static async findAllDraftForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftForShop({ query, limit, skip })
    }

    static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true }
        return await findAllPublishedForShop({ query, limit, skip })
    }

    static async searchProducts({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit, sort, filter, page,
            select: ['product_name', 'product_price', 'product_thumb']
        })
    }

    static async findProducts({ product_id }) {
        return await findProducts({ product_id, unSelect: ['__v', 'product_variations'] })
    }
}

/**
 * product_name: { type: String, required: true },
    product_thumb: { type: String, require: true },
    product_description: String,
    product_price: { type: Number, require: true },
    product_quantity: { type: Number, require: true },
    product_type: { type: String, require: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, require: true }
 */

//define product class
class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_quantity, product_type, product_shop, product_attributes
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    //create new product
    async createProduct(product_id) {
        return await product.create({ ...this, _id: product_id })
    }

    //update Product
    async updateProduct(productId, bodyUpdate) {
        return await updateProductById({ productId, bodyUpdate, model: product })
    }
}

//Define sub-class for different product types Clothing
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newClothing) throw new BadRequestError('Create new clothing error')

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }

    async updateProduct(productId) {
        //1. remove attr has null underfined
        const objectParams = removeUndefineObject(this)
        //2. check xem update o cho nao?
        if (objectParams.product_attributes) {
            // update child
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(objectParams.product_attributes),
                model: clothing
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

//Define sub-class for different product types Electronic
class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newElectronic) throw new BadRequestError('Create new electronic error')

        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newFurniture) throw new BadRequestError('Create new furniture error')

        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }
}

ProductFactory.registryProductType('Clothing', Clothing)
ProductFactory.registryProductType('Electronics', Electronics)
ProductFactory.registryProductType('Furniture', Furniture)

module.exports = ProductFactory