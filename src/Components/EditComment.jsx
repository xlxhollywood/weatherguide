import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core';
import { editComment, getAllComments } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';

const initialValue = {
    landmark_id: "",
    review_author: "",
    review_content: "",
    created_at: "",
    visited_date: "",
    rating: "",
    recommend_num: "",
    best_companion: "",
}

const EditComment = () => {

    const [comment, setComment] = useState(initialValue);
    const {landmark_id, review_author, review_content, created_at, visited_date, rating, recommend_num, best_companion} = comment;

    const { id } = useParams();

    useEffect(() => {
        loadCommentData();
    }, []);

    const loadCommentData = async () => {
        const response = await getAllComments(id);
        setComment(response.data);
    }

    const history = useHistory();

    const onValueChange = (e) => {
        //  console.log(e);
        // console.log(e.target.value);
        setComment({ ...comment, [e.target.name]: e.target.value });
        console.log(comment);
    }

    const editCommentDetails = async () => {
        await editComment(id, comment);
        history.push('/all');
    }

    return (
        <Container maxWidth="sm">
            <Box my={5}>
                <Typography variant="h5" align="center">Update Comment Details</Typography>
                <FormGroup>
                <FormControl>
                    <InputLabel>landmark_id</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="landmark_id" value={landmark_id} />
                </FormControl>
                <FormControl>
                    <InputLabel>review_author</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="review_author" value={review_author} />
                </FormControl>
                <FormControl>
                    <InputLabel>review_content</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="review_content" value={review_content} />
                </FormControl>
                <FormControl>
                    <InputLabel>created_at</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="created_at" value={created_at} />
                </FormControl>
                <FormControl>
                    <InputLabel>visited_date</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="visited_date" value={visited_date} />
                </FormControl>
                <FormControl>
                    <InputLabel>rating</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="rating" value={rating} />
                </FormControl>
                <FormControl>
                    <InputLabel>recommend_num</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="recommend_num" value={recommend_num} />
                </FormControl>
                <FormControl>
                    <InputLabel>best_companion</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="best_companion" value={best_companion} />
                </FormControl>
                    <Box my={3}>
                        <Button variant="contained" onClick={() => editCommentDetails()} color="primary" align="center">Update Comment</Button>
                        <Button onClick={() => history.push("/all")} variant="contained" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    )
}


export default EditComment;
