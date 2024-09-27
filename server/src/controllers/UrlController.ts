import { ApiError, ApiResponse, Controller } from '../types'
import UrlModel from '../models/url.model'
import crypto from 'crypto'
import handleApiError from '../utils/convertError'

function generateShortCode(length: number = 8): string {
    return crypto.randomBytes(length).toString('hex')
}

export const shortenUrl: Controller = async (req, res, next) => {
    try {
        //! TODO: validate req.body using express-validator

        const originalUrl = req.body.originalUrl as string // url user submitted

        let uniqueUrlCode = generateShortCode(3) // 3 bytes => 6 hex character

        // make sure the code hasn't exist on db yet
        while (!(await UrlModel.find({ urlCode: uniqueUrlCode }))) {
            uniqueUrlCode = generateShortCode(3)
        }

        const newUrl = new UrlModel({
            originalUrl: originalUrl,
            urlCode: uniqueUrlCode
        })
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

export const redirectUrl: Controller = async (req, res, next) => {
    try {
        const urlCode = req.params.urlCode

        // find the full url from database
        const urlDocument = await UrlModel.findOne({ urlCode }).exec()

        if (!urlDocument) {
            throw new ApiError('Can not find url with code: ' + urlCode, 404)
        }

        const response: ApiResponse = {
            success: true,
            message: 'Get original url succesfully',
            data: {
                urlCode: urlCode,
                originalUrl: urlDocument!.originalUrl
            }
        }
        //! TODO: redirect user instead of return json
        res.status(200).redirect(urlDocument.originalUrl)
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
