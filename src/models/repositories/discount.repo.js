'use strict'

const { getSelectData, unGetSelectData } = require('../../utils')

const findAllDiscontCodeUnSelect = async ({
    limit = 50, page = 1, sort = 'ctime', filter, unSelect, model
}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const documents = await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unGetSelectData(unSelect))
        .lean()

    return documents
}

const findAllDiscontCodeSelect = async ({
    limit = 50, page = 1, sort = 'ctime', filter, select, model
}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const documents = await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unGetSelectData(select))
        .lean()

    return documents
}

const checkDiscountExists = async ({ model, filter }) => {
    return await model.findOne(filter).lean()
}

module.exports = {
    findAllDiscontCodeUnSelect,
    findAllDiscontCodeSelect,
    checkDiscountExists
}