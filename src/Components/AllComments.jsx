import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Paper } from '@mui/material';
import { deleteComment, getAllComments } from '../service/api';
import { Link } from 'react-router-dom';


const AllComment = () => {

    const [comments, setComment] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getComments();
    }, [])

    const getComments = async () => {
        const response = await getAllComments();
        console.log(response);
        setComment(response.data);
    }

    const filteredComments = comments.filter(comment =>
        comment.review_author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = () => {
        const searchKey = document.getElementById("searchKeys").value;
        setSearchQuery(searchKey);
    }


    const deleteData = async (id) => {
        const deleteConfirm = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
        if (deleteConfirm) {
            await deleteComment(id);
            getComments();
        }

    }

    return (

        <Box sx={{ maxWidth: '1050px', mx: 'auto', padding: 2 }}>
            <Grid container spacing={2} sx={{ mt: 1 }}>

                <Paper sx={{ padding: 2 }}>
                    <Box mb={2} sx={{ display: 'flex', alignItems: 'center', width: "100%", }}>
                        <TextField
                            id="searchKeys"
                            variant="outlined"
                            fullWidth
                            placeholder="Search by author's name"

                        />
                        <Button for onClick={handleSearch}><i className="bi bi-search" style={{ fontSize: '1.5rem' }}></i></Button>
                    </Box>
                    <Box sx={{ maxHeight: '450px', overflowY: 'auto' }}>
                        {filteredComments.map((comment) => (
                            <Box key={comment.id} sx={{ mb: 2, border: '1px solid #ccc', padding: 1 }}>
                                <Typography variant="subtitle2">{comment.review_author}</Typography>
                                <Typography variant="body2">{comment.review_content}</Typography>
                                <Typography variant="caption">작성날짜: {comment.created_at}</Typography>
                                <Typography variant="caption"> |  방문날짜: {comment.visited_date}</Typography>
                                <Typography variant="caption"> |  평점: {comment.rating}</Typography>
                                <Typography variant="caption"> |  추천수: {comment.recommend_num}</Typography>
                                <Typography variant="caption"> |  추천 동행인: {comment.best_companion}</Typography>
                                <Box sx={{ justifyContent: 'flex-end' }}>
                                    <Button variant="contained" style={{ fontSize: '0.7rem', marginRight: '3px' }} component={Link} to={`/edit/${comment.id}`}><i className="bi bi-pencil-fill"></i></Button>
                                    <Button variant="contained" style={{ fontSize: '0.7rem' }} onClick={() => deleteData(comment.id)}><i className="bi bi-trash3-fill"></i></Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Grid>


        </Box>
    );
};


export default AllComment;
