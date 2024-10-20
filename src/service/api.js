import axios from 'axios';


const url = "https://670e233f073307b4ee459cf8.mockapi.io/api/userComments";

export const getAllComments = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const addComment = async (comment) => {
    return await axios.post(url, comment);
}

export const editComment = async (id, comment) => {
    return await axios.put(`${url}/${id}`, comment);
}


export const deleteComment = async (id) => {
    return await axios.delete(`${url}/${id}`);
}