import React from 'react'
import { useParams } from 'react-router-dom'
import { checkPasswordRequired } from '../services/UrlService'
import Password from './Password'

function RedirectUrl() {
    const { urlCode } = useParams()
    const [isRequirePassword, setIsRequirePassword] = React.useState<boolean>(false)
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await checkPasswordRequired(urlCode as string)

                // @ts-ignore
                setIsRequirePassword(response.requirePassword)
                // @ts-ignore
                if (!response.requirePassword) {
                    // Redirect to the original URL
                    // @ts-ignore
                    window.location.href = response.originalUrl
                }
            } catch (error) {
                window.location.href = '/not-found'
            }
        }
        fetchData()
    }, [])

    // return password page
    return <div>{isRequirePassword && <Password />}</div>
}

export default RedirectUrl
