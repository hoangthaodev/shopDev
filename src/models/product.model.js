'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, require: true },
    product_description: String,
    product_price: { type: Number, require: true },
    product_quantity: { type: Number, require: true },
    product_type: { type: String, require: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, require: true }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

// define the product type = clothing

const clothingSchema = new Schema({
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
}, {
    collection: 'clothes',
    timestamps: true
})

// define the product type = electtronic

const electronicSchema = new Schema({
    manufacture: { type: String, require: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
}, {
    collection: 'electronics',
    timestamps: true
})

const furnitureSchema = new Schema({
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
}, {
    collection: 'funitures',
    timestamps: true
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Electronics', electronicSchema),
    clothing: model('Clothing', clothingSchema),
    furniture: model('Furniture', furnitureSchema)
};