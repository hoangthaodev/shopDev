'use strict'

const { SuccessResponse } = require("../core/success.response")
const DiscountService = require("../services/discount.service")

class DiscontController {
    createDiscountCode = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful code generations',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getAllDiscountCodes = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful code Found',
            metadata: await DiscountService.getAllDiscountCodesByShop({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getAllDiscountAmount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful code Found',
            metadata: await DiscountService.getDiscountAmount({
                ...req.body,
            })
        }).send(res)
    }

    getAllDiscountCodesWithProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful code Found',
            metadata: await DiscountService.getAllDiscountCodesWithProduct({
                ...req.query,
            })
        }).send(res)
    }

}

module.exports = new DiscontController()