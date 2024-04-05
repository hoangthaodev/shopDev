'use strict'
const {
    BadRequestError,
    NotFoundError
} = require('../core/error.response')
const { cart } = require('../models/cart.model')
/**
 * Key features: Cart Service
 * - add product to cart [user]
 * - reduce product quantity by one[user]
 * - increase product quantity by one [user]
 * - get cart [user]
 * - delete cart [user]
 * - delete cart item [user]
 */

class CartService {

    //start repo cart ///
    static async createUserCart({ userId, product }) {
        const query = { cart_userId = userId, cart_state: 'active' },
            updateOrInsert = {
                $addToSet: {
                    cart_products: product
                }
            }, option = { upsert: true, new: true }

        return await cart.findOneAndUpdate(query, updateOrInsert, option)
    }

    static async updateUserCartQuantity({ userId, product }) {

        const { productId, quantity } = product
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, option = { upsert: true, new: true }

        return await cart.findOneAndUpdate(query, updateSet, option)
    }
    //end repo cart ///
    static async addToCart({ userId, product = {} }) {
        // check cart ton tai hay khong
        const userCart = await cart.findOne({ cart_userId: userId })
        if (!userCart) {
            // create cart for User
            return await CartService.createUserCart({ userId, product })
        }
        // neu co gio hang roi nhung chua co san pham?
        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            return await userCart.save()
        }

        //gio hang ton tai, va co san pham nay thi update quantity
        return await CartService.updateUserCartQuantity({ userId, product })
    }
}