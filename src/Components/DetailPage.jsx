import React, { useEffect, useState } from 'react';
import {Box, Typography, Button, TextField, Grid, Paper} from '@mui/material';
import { deleteComment, getAllComments } from '../service/api';
import { Link, useParams  } from 'react-router-dom';
import DatePicker from './Pages/DatePicker';
import Carousel from './Pages/Carousel';


const DetailPage = () => {

    const { landmark_id } = useParams();
    const [comments, setComment] = useState([]);
    const [landmarkInfo, setLandmarkInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getComments();
        fetchLandmarkInfo();
    }, [])

    const getComments = async () => {
        const response = await getAllComments();
        console.log(response);
        setComment(response.data);
    }

    const fetchLandmarkInfo = async () => {
        //landmark_id 이용하여 날씨데이터 가져옴
        //나머지 데이터는 public에 저장했다가 가져올 수도, 아래는 예시
        const info = {
            name: "호미곶",
            address: "경상북도 포항시",
            description: "새천년 박물관이 있는 유명 관광명소입니다.",
        };
        setLandmarkInfo(info);  
    };
    

    const getLandmarkComments = (landmark_id) => {
        return comments.filter(comment => comment.landmark_id == landmark_id);
    }

    const landmarkComments = getLandmarkComments(landmark_id);

    const filteredComments = comments.filter(comment =>
        comment.review_author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteData = async (id) => {
        await deleteComment(id);
        getComments();
    }

    return (

        <Box sx={{ maxWidth: '1050px', mx: 'auto', padding: 2 }}>
            <Carousel landmark_id={landmark_id} />

            <Paper sx={{ padding: 2, mt: 2 }}>
                <Typography variant="h4">{landmarkInfo.name}</Typography>
                <Typography variant="body2">
                    주소: {landmarkInfo.address}<br />
                    설명: {landmarkInfo.description}
                </Typography>
            </Paper>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ padding: 2 }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search by author's name"
                            fullWidth
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                            Write New Review
                        </Button>
                        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {landmarkComments.map((comment) => (
                                <Box key={comment.id} sx={{ mb: 2, border: '1px solid #ccc', padding: 1 }}>
                                    <Typography variant="h6">{comment.review_author}</Typography>
                                    <Typography variant="body2">{comment.review_content}</Typography>
                                    <Typography variant="body2">작성날짜: {comment.created_at}</Typography>
                                    <Typography variant="body2">방문날짜: {comment.visited_date}</Typography>
                                    <Typography variant="body2">평점: {comment.rating}</Typography>
                                    <Typography variant="body2">추천수: {comment.recommend_num}</Typography>
                                    <Typography variant="caption">추천 동행인: {comment.best_companion}</Typography>
                                    <Button variant="contained" style={{ backgroundColor: 'skyblue', color: 'white', margin: '0px 20px' }} component={Link} to={`/edit/${comment.id}`}>Edit</Button>
                                    <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 20px' }} onClick={() => deleteData(comment.id)}>Delete</Button>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h5">날씨 정보</Typography>
                        <Typography variant="body2">
                            <DatePicker />
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};


export default DetailPage;
