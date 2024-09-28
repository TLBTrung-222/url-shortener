import React from 'react'
import { useParams } from 'react-router-dom'
import { checkPasswordRequired } from '../services/UrlService'

function RedirectUrl() {
    const { urlCode } = useParams()
    const [isRequirePassword, setIsRequirePassword] = React.useState<boolean>(false)
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await checkPasswordRequired(urlCode as string)
            // @ts-ignore
            setIsRequirePassword(response.requirePassword)
            // @ts-ignore
            if (!response.requirePassword) {
                // Redirect to the original URL
                // @ts-ignore
                window.location.href = response.originalUrl
            }
        }
        fetchData()
    }, [])

    return <div>{isRequirePassword && <p>Password is required to access this URL.</p>}</div>
}

export default RedirectUrl
