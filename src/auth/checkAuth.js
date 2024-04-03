'use strict'

const { findById } = require("../services/apikey.service")

const HEADER = {
    AIP_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.AIP_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'APIKEY need to import'
            })
        }
        // check objKey
        const objKey = await findById(key)
        console.log('objkey:::', objKey);
        if (!objKey) {
            return res.status(403).json({
                message: 'ApiKey not match'
            })
        }
        req.objKey = objKey
        return next()

    } catch (error) {
        return error
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'permission denied'
            })
        }

        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        return next()
    }
}



module.exports = {
    apiKey,
    permission
}