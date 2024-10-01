import { ApiError, ApiResponse, Controller } from '../types'
import UrlModel from '../models/url.model'
import crypto from 'crypto'
import handleApiError from '../utils/convertError'

async function generateShortCode(length: number = 8) {
    let shortCode
    let existingUrl

    // make sure the code hasn't exist on db yet
    while (true) {
        shortCode = crypto.randomBytes(length).toString('hex')
        existingUrl = await UrlModel.findOne({ urlCode: shortCode })
        if (!existingUrl) break
    }
    return shortCode
}

export const shortenUrl: Controller = async (req, res, next) => {
    try {
        const { originalUrl, password, expireAt, customCode } = req.body
        let uniqueUrlCode
        if (customCode) uniqueUrlCode = customCode
        else uniqueUrlCode = await generateShortCode(3) // 3 bytes => 6 hex character

        const newUrl = new UrlModel({
            originalUrl: originalUrl,
            urlCode: uniqueUrlCode
        })

        // add optional fields
        if (password) newUrl.password = password
        if (expireAt) newUrl.expireAt = expireAt

        await newUrl.save()

        const response: ApiResponse = {
            success: true,
            message: 'Created new url succesfully',
            data: {
                uniqueCode: uniqueUrlCode,
                shortUrl: `${process.env.BASE_URL}/urls/${uniqueUrlCode}`
            }
        }

        res.status(201).json(response)
    } catch (error) {
        handleApiError(error, next)
    }
}

export const getUrls: Controller = async (req, res, next) => {
    try {
        const urlDocuments = await UrlModel.find()

        // exlucde data properties before response
        const filterdUrlDocuments = urlDocuments.map((urlDoc) => {
            const urlObject = urlDoc.toObject()
            // @ts-ignore
            delete urlObject._id
            // @ts-ignore
            delete urlObject.__v
            if (urlObject.password) delete urlObject.password

            return urlObject
        })

        const response: ApiResponse = {
            success: true,
            message: 'Get all url succesfully',
            data: { urls: filterdUrlDocuments }
        }
        res.status(200).json(response)
    } catch (error) {
        handleApiError(error, next)
    }
}

// if the urlCode require password, if yes just ask fe to display password prompt
// else return the original url to fe (fe need to perform redirect)
export const isRequirePassword: Controller = async (req, res, next) => {
    try {
        const urlCode = req.params.urlCode
        const urlDocument = await UrlModel.findOne({ urlCode }).exec()

        if (!urlDocument) {
            throw new ApiError('Can not find url with code: ' + urlCode, 404)
        }

        // no password required, redirect...
        if (!urlDocument.password)
            return res.status(200).json({
                requirePassword: false,
                originalUrl: urlDocument.originalUrl
            })
        // password required, inform FE
        else return res.status(200).json({ requirePassword: true })
    } catch (error) {
        handleApiError(error, next)
    }
}

// we assume that fe only call to this route with req.body.password and req.params.urlCode
// and this urlCode require password
export const getUrlWithPassword: Controller = async (req, res, next) => {
    try {
        const urlCode = req.params.urlCode
        const password = req.body.password as string | null

        // find the full url from database
        const urlDocument = await UrlModel.findOne({ urlCode }).exec()

        if (!urlDocument) {
            throw new ApiError('Can not find url with code: ' + urlCode, 404)
        }

        let response: ApiResponse
        if (urlDocument.password !== password) {
            response = { success: false, error: 'Password mismatch' }
            return res.status(401).json(response)
        }

        response = {
            success: true,
            message: 'Password matched',
            data: { originalUrl: urlDocument.originalUrl }
        }
        return res.status(200).json(response)
    } catch (error) {
        handleApiError(error, next)
    }
}

export const deleteUrls: Controller = async (req, res, next) => {
    try {
        const result = await UrlModel.deleteMany()
        const response: ApiResponse = {
            success: true,
            message: 'Delete all urls succesfully',
            data: { result }
        }
        res.status(201).json(response)
    } catch (error) {
        handleApiError(error, next)
    }
}
