import React from 'react'
import { getUrls } from '../services/UrlService'
import { UrlList as UrlListType } from '../types'

function UrlList() {
    const [urlList, setUrlList] = React.useState<UrlListType | null>(null)
    React.useEffect(() => {
        const fetchUrlList = async () => {
            const apiResponse = await getUrls()
            setUrlList(apiResponse.data)
        }

        fetchUrlList()
    }, [])

    return (
        <div>
            {urlList &&
                urlList.urls.map((url) => {
                    return (
                        <>
                            <li>
                                {url.originalUrl} - {url.urlCode}
                            </li>
                        </>
                    )
                })}
        </div>
    )
}

export default UrlList
