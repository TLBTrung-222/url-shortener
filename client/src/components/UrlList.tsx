import React from 'react'
import { getUrls } from '../services/UrlService'
import { UrlList as UrlListType } from '../types'
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Skeleton,
    Box
} from '@mui/material'

function UrlList() {
    const [urlList, setUrlList] = React.useState<UrlListType | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        const fetchUrlList = async () => {
            setIsLoading(true)
            const apiResponse = await getUrls()
            setIsLoading(false)
            setUrlList(apiResponse.data)
        }
        fetchUrlList()
    }, [])

    const handleChipClick = (urlCode: string) => {
        window.location.href = `${import.meta.env.VITE_CLIENT_URL}/${urlCode}`
    }

    return (
        <Paper sx={{ padding: 1, marginTop: 2, width: '100%', overflow: 'hidden', boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
                URL List
            </Typography>

            {isLoading ? (
                <Box>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </Box>
            ) : (
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
                                        <TableCell>
                                            <Chip label={url.urlCode} onClick={() => handleChipClick(url.urlCode)} />
                                        </TableCell>
                                        <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>
                                            {url.expireAt ? new Date(url.expireAt).toLocaleString() : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    )
}

export default UrlList
