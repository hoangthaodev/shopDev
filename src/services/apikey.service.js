'use strict'

const apikeyModel = require("../models/apikey.model")
const crypto = require('crypto')

const findById = async (key) => {
    const hadKey = await apikeyModel.find()
    if (hadKey.length === 0) {
        await createKey()
    }
    const objKey = await apikeyModel.findOne({ key, status: true }).lean()
    return objKey
}

const createKey = async () => {
    const newKey = await apikeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] })
    return newKey
}

module.exports = {
    findById,
    createKey
}