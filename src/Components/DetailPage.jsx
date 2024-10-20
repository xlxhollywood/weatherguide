import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Paper } from '@mui/material';
import { deleteComment, getAllComments, editComment } from '../service/api';
import { Link, useParams } from 'react-router-dom';
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
        const infoList = [
            { name: "경복궁", address: "서울시 종로구", description: "조선 왕조의 첫 번째 궁궐로, 아름다운 건축물과 정원이 어우러져 역사적인 매력을 지니고 있습니다.", },
            { name: "남산 N타워", address: "서울시 용산구", description: "서울의 상징적인 전망대로, 도시 전경을 한눈에 볼 수 있으며, 특히 야경이 아름답습니다.", },
            { name: "남이섬", address: "강원 춘천시 남산면", description: "북한강에 위치한 아름다운 섬으로, 사계절 내내 다양한 경관을 제공하며, 특히 단풍과 벚꽃 시즌에 인기가 많습니다.", },
            { name: "불국사", address: "경상북도 경주시 불국로", description: "세계문화유산으로 등록된 고대 사찰로, 섬세한 건축물과 아름다운 경관이 어우러져 있는 장소입니다.", },
            { name: "설악산", address: "강원 양양군 대청봉길", description: "아름다운 자연경관과 다양한 등산로를 제공하는 국립공원으로, 특히 가을 단풍이 장관을 이루는 곳입니다.", },
            { name: "수원화성", address: "경기도 수원시 장안구", description: "조선 시대에 건축된 성곽으로, 역사와 문화가 살아 숨 쉬는 곳이며, UNESCO 세계문화유산으로 지정되어 있습니다.", },
            { name: "전주 한옥마을", address: "전라북도 전주시 완산구", description: "전통 한옥이 잘 보존된 마을로, 한국의 전통 문화를 체험할 수 있는 장소로 유명하며, 맛있는 전주 비빔밥도 즐길 수 있습니다.", },
            { name: "한라산", address: "제주 서귀포시 토평동", description: "제주도의 가장 높은 산으로, 다양한 식생과 생태계를 자랑하며, 하이킹과 등반을 즐기는 사람들에게 인기가 많습니다.", },
            { name: "호미곶", address: "경상북도 포항시 남구", description: "호미곶은 아름다운 해안선과 일출 명소로 유명하며, 매년 새해 첫날 많은 사람들이 모여 해맞이를 즐기는 곳입니다.", },
        ];
        setLandmarkInfo(infoList[landmark_id]);
    };

    const getLandmarkComments = (landmark_id) => {
        return comments.filter(comment => comment.landmark_id == landmark_id);
    }


    const landmarkComments = getLandmarkComments(landmark_id);

    const filteredComments = landmarkComments.filter(comment =>
        comment.review_author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const findAverageRating = () => {
        if (filteredComments.length === 0) {
            return null;
        }
        const totalStars = filteredComments.reduce((sum, comment) => sum + Number(comment.rating), 0);
        const averageRating = (totalStars / filteredComments.length);
        //alert(`${totalStars}//${averageRating}//${comments.length}`);
        return (averageRating.toFixed(1) + starRating(averageRating.toFixed(0)));
    }

    const findBestComment = () => {
        if (filteredComments.length === 0) {
            return 0;
        }
        const bestComment = filteredComments.reduce((max, comment) => {
            return (comment.recommend_num > max.recommend_num) ? comment : max;
        });
        return bestComment;
    }

    const handleSearch = () => {
        const searchKey = document.getElementById("searchKeys").value;
        setSearchQuery(searchKey);
    }

    const clickLike = async (id) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === id) {
                return {
                    ...comment,
                    recommend_num: comment.recommend_num + 1 // 좋아요 수 증가
                };
            }
            return comment; // 다른 댓글은 그대로 반환
        });

        // 좋아요 수가 증가한 댓글을 API에 전달
        const updatedComment = updatedComments.find(comment => comment.id === id);
        await editComment(id, updatedComment);

        // 댓글 목록 새로고침
        getComments();
    };

    const starRating = (rating) => {
        switch (rating) {
            case '1': return "⭐";
            case '2': return "⭐⭐";
            case '3': return "⭐⭐⭐";
            case '4': return "⭐⭐⭐⭐";
            case '5': return "⭐⭐⭐⭐⭐";
            default: return "알 수 없음";
        }
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
                        <Box mb={2} sx={{ display: 'flex', alignItems: 'center', width: "100%", }}>
                            <TextField
                                id="searchKeys"
                                variant="outlined"
                                fullWidth
                                placeholder="Search by author's name"

                            />
                            <Button for onClick={handleSearch}><i className="bi bi-search" style={{ fontSize: '1.5rem' }}></i></Button>
                        </Box>
                        <Button variant="contained" color="primary" sx={{ mb: 2 }} component={Link} to={`/add/${landmark_id}`}>
                            새로운 후기 쓰기
                        </Button>
                        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {filteredComments.map((comment) => (
                                <Box key={comment.id} sx={{ mb: 2, border: '1px solid #ccc', padding: 1 }}>
                                    <Typography variant="h6">{comment.review_author} <Button onClick={() => clickLike(comment.id)}>좋아요<i className="bi bi-hand-thumbs-up-fill"></i>{comment.recommend_num}</Button></Typography>

                                    <Typography variant="body2">{comment.review_content}</Typography>
                                    <br />
                                    <Typography variant="body2">평점: {comment.rating}{starRating(comment.rating)}</Typography><br />
                                    <Typography variant="body2">작성날짜: {comment.created_at}</Typography>
                                    <Typography variant="body2">방문날짜: {comment.visited_date}</Typography>

                                    <Typography variant="caption">추천 동행인: {comment.best_companion}</Typography>
                                    <Box sx={{ justifyContent: 'flex-end' }}>
                                        <Button variant="contained" style={{ fontSize: '0.7rem', marginRight: '3px' }} component={Link} to={`/edit/${comment.id}`}><i className="bi bi-pencil-fill"></i></Button>
                                        <Button variant="contained" style={{ fontSize: '0.7rem' }} onClick={() => deleteData(comment.id)}><i className="bi bi-trash3-fill"></i></Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h5">평균 평점: {findAverageRating()}</Typography>
                        <Typography variant="body1">총 후기: {filteredComments.length} 개</Typography>
                        <hr />
                        <Typography variant="h6">Best 후기<i className="bi bi-hand-thumbs-up"></i> : 좋아요 {findBestComment().recommend_num}개</Typography>
                        <Typography variant="body2">
                            작성자: {findBestComment().review_author} | 평점: {findBestComment().rating} {starRating(findBestComment().rating)}
                            <br />"{findBestComment().review_content}"
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};


export default DetailPage;
