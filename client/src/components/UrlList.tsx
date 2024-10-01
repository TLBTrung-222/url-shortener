import React from 'react'
import { getUrls } from '../services/UrlService'
import { UrlList as UrlListType } from '../types'
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

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
        <Paper sx={{ padding: 2, marginTop: 2, width: '100%', overflow: 'hidden' }}>
            <Typography variant="h5" gutterBottom>
                URL List
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Original URL</TableCell>
                            <TableCell>Unique Code</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Expire At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urlList &&
                            urlList.urls.map((url) => (
                                <TableRow key={url.urlCode}>
                                    <TableCell>{url.originalUrl}</TableCell>
                                    <TableCell>{url.urlCode}</TableCell>
                                    <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        {url.expireAt ? new Date(url.expireAt).toLocaleString() : 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default UrlList
