export const shortenUrl = async (originalUrl: any) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/urls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl })
    })

    const data = await response.json()
    console.log(data)
}
