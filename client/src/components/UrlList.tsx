import React from 'react'
import { getUrls } from '../services/UrlService'
import { UrlList as UrlListType } from '../types'
import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

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
        <Paper sx={{ padding: 2, marginTop: 2, width: '1400px' }}>
            <Typography variant="h5" gutterBottom>
                URL List
            </Typography>
            <List>
                {urlList &&
                    urlList.urls.map((url) => (
                        <ListItem key={url.urlCode} divider>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <ListItemText primary={url.originalUrl} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={new Date(url.createdAt).toLocaleString()} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={url.urlCode} />
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
            </List>
        </Paper>
    )
}

export default UrlList
