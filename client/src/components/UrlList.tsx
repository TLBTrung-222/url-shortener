import React from 'react'
import { getUrls } from '../services/UrlService'
import { UrlList as UrlListType } from '../types'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

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
        <Paper sx={{ padding: 2, marginTop: 2, width: '900px' }}>
            <Typography variant="h5" gutterBottom>
                URL List
            </Typography>
            <List>
                {urlList &&
                    urlList.urls.map((url) => (
                        <ListItem key={url.urlCode} divider>
                            <ListItemText primary={url.originalUrl} secondary={`Short URL Code: ${url.urlCode}`} />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    )
}

export default UrlList
