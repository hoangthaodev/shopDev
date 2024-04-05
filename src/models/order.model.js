'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

// Declare the Schema of the Mongo model
var orderSchema = new Schema({
    order_userId: { type: String, required: true },
    order_checkout: { type: Object, default: {} },
    /**
     * order_checkout = {
     *  totalPrice,
     *  totalApllyDiscount,
     *  feeShip
     * }
     */
    order_shipping: { type: Object, default: {} },
    /**
     * street,
     * city,
     * state,
     * country
     */
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, require: true },
    order_trackingNumber: { type: String, default: '#0000118852022' },
    order_status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'canceled', 'delivered'], default: 'pending' }
}, {
    collection: COLLECTION_NAME,
    timestamps: {
        createdAt: 'createOn',
        updatedAt: 'modifineOn'
    }
});

//Export the model
module.exports = {
    order: model(DOCUMENT_NAME, orderSchema)
};