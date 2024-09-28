import React from 'react'
import { useParams } from 'react-router-dom'

function RedirectUrl() {
    const { urlCode } = useParams()
    const serverUrl = import.meta.env.VITE_SERVER_URL

    const redirect = () => {
        let url = serverUrl + '/urls/' + urlCode
        window.location.replace(url)
    }

    React.useEffect(() => {
        if (urlCode) redirect()
    }, [urlCode])

    return <div>Redirecting...</div>
}

export default RedirectUrl
