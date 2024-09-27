import { ApiResponse, Controller } from '../types'
import UrlModel from '../models/url.model'

export const shortenUrl: Controller = async (req, res, next) => {
    //! TODO: validate req.body

    const fullUrl = req.body.fullUrl as string // url user submitted

    const newUrl = new UrlModel({
        longUrl: fullUrl,
        urlCode: 'smthNeedToUnique'
    })
    await newUrl.save()

    const response: ApiResponse = {
        success: true,
        message: 'Created new url succesfully',
        data: { newUrl }
    }

    res.status(201).json(newUrl)
}
