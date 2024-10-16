import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, makeStyles, Button } from '@material-ui/core';
import { deleteComment, getAllComments } from '../service/api';
import { Link } from 'react-router-dom';
import Carousel from './Pages/Carousel';

const useStyle = makeStyles({
    table: {
        maxWidth: '1050px',
        margin: '0 auto', // Center the header,
    },
    thead: {
        '& > *': {
            background: 'gray',
            color: 'white',
            fontSize: '16px',
            height: '20px',
        }
    },
    trow: {
        '& > *': {
            fontSize: '16px'
        }
    }
})




const AllComments = () => {

    const classes = useStyle();

    const [comment, setComment] = useState([]);
    useEffect(() => {
        getComments();
    }, [])

    const getComments = async () => {
        const response = await getAllComments();
        console.log(response);
        setComment(response.data);
    }

    const deleteData = async (id) => {
        await deleteComment(id);
        getComments();
    }

    return (

        <>
        <Carousel landmark_id="pohang" />
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>ID</TableCell>
                    <TableCell>Landmark ID</TableCell>
                    <TableCell>review_author</TableCell>
                    <TableCell>review_content</TableCell>
                    <TableCell>created_at</TableCell>
                    <TableCell>visited_date</TableCell>
                    <TableCell>rating</TableCell>
                    <TableCell>recommend_num</TableCell>
                    <TableCell>best_companion</TableCell>
                    <TableCell>Edit/Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    comment.map((data) => (
                        <TableRow className={classes.trow}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.landmark_id}</TableCell>
                            <TableCell>{data.review_author}</TableCell>
                            <TableCell>{data.review_content}</TableCell>
                            <TableCell>{data.created_at}</TableCell>
                            <TableCell>{data.visited_date}</TableCell>
                            <TableCell>{data.rating}</TableCell>
                            <TableCell>{data.recommend_num}</TableCell>
                            <TableCell>{data.best_companion}</TableCell>
                            <TableCell>
                                <Button variant="contained" style={{ backgroundColor: 'skyblue', color: 'white', margin: '0px 20px' }} component={Link} to={`/edit/${data.id}`}>Edit</Button>
                                <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 20px' }} onClick={() => deleteData(data.id)}>Delete</Button>
                            </TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </>
    )
}

export default AllComments;
