import React from 'react'
import './Card.css'
import { useSelector } from 'react-redux'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useState } from 'react';

const Card = (props) => {
    const user = useSelector(state => state.userReducer);
    const [commetnBox, setCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const CONFIG_OBJ = {
        headers: {
            "Contenet-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const submitComment = async (postId) => {
        setCommentBox(false);
        const request = { "postId": postId, "commentText": comment };
        const response = await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
    }

    const likeDislikePost = async (postId, type) => {
        const request = { "postId": postId };
        const response = await axios.put(`${API_BASE_URL}/${type}`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
    }

    return(
        <div className='card-container'>
        <div className="card shadow-sm">
            <div className="card-body">
                <div className='row'>
                    <div className='col-6'>
                        <div className='float-start'>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='float-start'>
                                        <img className="profile-pic"alt='profile pic' src='https://images.unsplash.com/photo-1682687220499-d9c06b872eee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                                    </div>
                                </div>
                                <div className='col-8'>
                                    <div className='float-start'>
                                        <p className='fs-5 ms-1 fw-bold'>{props.postData.author.fullName}</p>
                                        <p className='location'>{props.postData.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.postData.author._id === user._id? <div className='col-6 '>
                        <i onClick={()=>props.deletePost(props.postData._id)} style={{ cursor: "pointer" }}  className="fa-solid fa-ellipsis-vertical mt-1 p-3 vertical float-end color-primary"></i>
                    </div> :  ""}
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <img className='p-1 img-fluid post-pic' alt='post-pic' src={props.postData.image}/>
                    </div>
                    <p className='description ms-3 text-white'>{props.postData.description}</p>
                </div>

                <div className='row'>
                    <div className='col-8 float-start mt-2'>
                        <i onClick={()=>likeDislikePost(props.postData._id, 'like')} className="fa-regular fa-thumbs-up fs-3 heart ms-3" style={{ cursor: "pointer" }}></i>
                        <i onClick={()=>likeDislikePost(props.postData._id, 'unlike')} className="fa-regular fa-thumbs-down fs-3 dislike ms-4" style={{ cursor: "pointer" }}></i>
                        <i onClick={()=>setCommentBox(true)}className="fa-regular fa-comment fs-3 comment ms-4"></i>
                    </div>
                    <div className='col-4'>
                        <span className='fs-5 fw-bold likes-count float-end '>{props.postData.likes.length} likes</span>
                    </div>
                </div>
                {commetnBox ?<div className='row'>
                    <div className='col-9'>
                        <textarea onChange={(e)=>setComment(e.target.value)} className='form-control'></textarea>
                    </div>
                    <div className='col-3'>
                        <button onClick={() => submitComment(props.postData._id)} className='btn btn-warning'>Submit</button>
                    </div>
                </div> : ""}
                { props.postData.comments.map((comment)=>{
                    return (<div className='row'>
                    <div className='col-12'>
                        <p className='text-white'>@{comment.commentedBy.fullName} - {comment.commentText}</p>
                    </div>
                </div>)
                }) }
                <span className='ms-3 text-muted'>2 hours ago</span>
            </div>
        </div>
    </div>
    )
}
 export default Card