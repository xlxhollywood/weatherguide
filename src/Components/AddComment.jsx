import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, TextField, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { addComment } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';

const initialValue = {
    landmark_id: "",
    review_author: "",
    review_content: "",
    created_at: "",
    visited_date: "",
    rating: "",
    recommend_num: 0,
    best_companion: "없음",
}

const AddComment = () => {

    const [comment, setComment] = useState(initialValue);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { landmark_id } = useParams();
    const history = useHistory();

    const addCommentDetails = async () => {
        await addComment(comment);
        history.push(`/detailpage/${landmark_id}`);
    }

    useEffect(() => {
        if (comment.review_author) { // review_author가 있는 경우에만 실행
            addCommentDetails();
        }
    }, [comment]);

    const onSubmit = (data) => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        setComment({
            landmark_id: landmark_id,
            review_author: data.review_author,
            review_content: data.review_content,
            visited_date: data.visited_date,
            rating: data.rating,
            best_companion: data.best_companion,
            created_at: formattedDate,
            recommend_num: 0,
        });
        addCommentDetails();
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '50px' }}>
            <hr />
            <Paper style={{ padding: '20px' }}>
                <Typography variant="h5" align="center">새 댓글 추가</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="작성자"
                        {...register("review_author", { required: "이름을 입력해 주세요.", maxLength: { value: 30, message: "최대 30자까지 입력 가능합니다." } })}
                        error={!!errors.review_author}
                        helperText={errors.review_author ? errors.review_author.message : ""}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="내용"
                        multiline
                        rows={4}
                        {...register("review_content", { required: "내용을 입력해 주세요.", maxLength: { value: 500, message: "최대 500자까지 입력 가능합니다." } })}
                        error={!!errors.review_content}
                        helperText={errors.review_content ? errors.review_content.message : ""}
                    />
                    <br />
                    <br />
                    <Typography variant='subtitle1'>방문 날짜</Typography>
                    <TextField
                        fullWidth
                        type="date"
                        {...register("visited_date", { required: "날짜를 선택해 주세요." })}
                        error={!!errors.visited_date}
                        helperText={errors.visited_date ? errors.visited_date.message : ""}
                    />
                    <br />
                    <br />
                    <FormControl fullWidth style={{ padding: '10px' }}>
                        <Typography variant='subtitle1'>평점</Typography>
                        <select {...register("rating")}>
                            <option value="5">5점: 최고!! ⭐⭐⭐⭐⭐</option>
                            <option value="4">4점: 좋음!  ⭐⭐⭐⭐</option>
                            <option value="3">3점: 보통   ⭐⭐⭐</option>
                            <option value="2">2점: 아쉬움 ⭐⭐</option>
                            <option value="1">1점: 별로.. ⭐</option>
                        </select>
                    </FormControl>
                    <br />
                    <FormControl style={{ padding: '10px' }} component="fieldset">
                        <Typography component="legend">가장 추천하는 동행인</Typography>
                        <RadioGroup row>
                            [
                            <label>
                                <input {...register("best_companion", { required: "추천 동행인을 선택해 주세요." })} type="radio" value="친구" />
                                친구 ][
                            </label>
                            <label>
                                <input {...register("best_companion", { required: "추천 동행인을 선택해 주세요." })} type="radio" value="가족" />
                                가족  ][
                            </label>
                            <label>
                                <input {...register("best_companion", { required: "추천 동행인을 선택해 주세요." })} type="radio" value="회사 동료" />
                                회사 동료  ][
                            </label>
                            <label>
                                <input {...register("best_companion", { required: "추천 동행인을 선택해 주세요." })} type="radio" value="애인" />
                                애인 ]
                            </label>
                            </RadioGroup>
                            {errors.best_companion && (
                            <Typography variant="body2" color="error">
                                {errors.best_companion.message}
                            </Typography>
                        )}
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>등록</Button>
                    <Button onClick={() => history.push(`/detailpage/${landmark_id}`)} style={{ marginTop: '8px' }} variant="contained" fullWidth>취소</Button>
                </form>
            </Paper>
        </Container>
    )
}



export default AddComment;