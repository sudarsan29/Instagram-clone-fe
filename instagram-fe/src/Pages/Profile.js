import React, { useState, useEffect } from 'react'
import './Profile.css'
import Modal from 'react-bootstrap/Modal';
import '../components/Card.css'
import Button from 'react-bootstrap/Button';
import { API_BASE_URL } from '../config'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Profile = () => {

    const user = useSelector(state => state.userReducer);

    const navigate = useNavigate();
    const [image, setImage] = useState({ preview: '', data: '' })
    const [myallposts, setMyallposts] = useState([]);
    const [postDetail, setPostDetail] = useState({});
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CONFIG_OBJ = {
        headers: {
            "Contenet-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
        if(response.status === 200){
            getMyPosts();
            setShow(false);
        }
    }

    const [showPost, setShowPost] = useState(false);

    const handlePostClose = () => setShowPost(false);
    const handlePostShow = () => setShowPost(true);

    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }

    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
        return response;
    }

    const getMyPosts = async ()=>{
        const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);

        if (response.status === 200) {
            setMyallposts(response.data.posts);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occured while getting all our posts'
            })
        }
    }

    const showDetail = (post) => {
        setPostDetail(post);
    }
    const addPost = async () => {

        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Image is mandatory'
            })
        } else if (caption === '') {
            Swal.fire({
                icon: 'error',
                title: "Caption in mandatory"
            })
        } else if (location === '') {
            Swal.fire({
                icon: 'error',
                title: 'Location is mandatory'
            })
        } else {
            setLoading(true);
            const imgRes = await handleImgUpload();
            const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }

            const postResponse = await axios.post(`${API_BASE_URL}/createpost`, request, CONFIG_OBJ);
            setLoading(false);
            if (postResponse.status === 201) {
                navigate('/posts')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "some error occured"
                })
            }
        }
    }
    useEffect(()=>{
        getMyPosts();
    }, );

    return (
        <div>
            <div className="container container-profile shadow p-4">
                <div className='row'>
                    <div className='col-md-6 d-flex flex-column'>
                        <img className="profile-image mt-2 ms-1" alt='profile pic' src='https://images.unsplash.com/photo-1682687220499-d9c06b872eee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                        <p className='fw-bold ms-2'>{ user.email }</p>
                        <p className='ms-2'>{user.fullName}</p>
                        <p className='ms-2'>Full Stack Developer | follow @{user.fullName}</p>
                        <p className='ms-2'>My Portfolio on <a href='folio'>www.portfolio.com/{user.fullName}</a> </p>
                    </div>
                    <div className='col-md-6 d-flex flex-column justify-content-between mt-2'>
                        <div className='d-flex justify-content-equal mx-auto'>
                            <div className='count-section pe-4 pe-md-5 text-center fw-bold'>
                                <h4>{myallposts.length}</h4>
                                <p>posts</p>
                            </div>
                            <div className='count-section px-4 px-md-5 text-center fw-bold'>
                                <h4>30</h4>
                                <p>followers</p>
                            </div>
                            <div className='ps-md-5 ps-4 text-center fw-bold'>
                                <h4>20</h4>
                                <p>following</p>
                            </div>
                        </div>
                        <div >
                            <button className='custom-btn custom-btn-primary ms-5'>
                                <span className='fs-6'>Edit Profile</span>
                            </button>
                            <button className='custom-btn custom-btn-primary ms-5' onClick={handlePostShow}>
                                <span className='fs-6'>Upload Post</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <hr />
                    </div>
                </div>
                <div className='row card-profile'>
                {myallposts.map((post)=>{
                    return (
                    <div className='col-md-4 col-sm-12' key={post._id}>
                        <div className='card' onClick={handleShow}>
                            <img onClick={() => showDetail(post)} src={post.image} className='card-img-top' alt= {post.description} />
                        </div>
                    </div>
                    )
                })}
                    
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div>
                                <div id="carouselExampleIndicators" className="carousel slide">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={postDetail.image} className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="https://images.unsplash.com/photo-1635819335758-304866e30d39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="https://images.unsplash.com/photo-1703877048317-c74856d65c42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." />
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='row'>
                                <div className='col-6 '>
                                    <div className='float-start'>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <div className='float-start profile-responsive'>
                                                    <img className="profile-pic" alt='profile pic' src='https://images.unsplash.com/photo-1682687220499-d9c06b872eee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                                                </div>
                                            </div>
                                            <div className='col-8'>
                                                <div className='float-start profile-responsive'>
                                                    <p className='fs-5 fw-bold'>{postDetail.location}</p>
                                                    <p className='location'>{postDetail.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 profile-responsive'>
                                    <div className='float-end'>
                                        <div className="dropdown">
                                            <a className="vertical" href="link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis-vertical p-3"></i>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item d-flex flex-col" href="link"><i className="fa-regular fa-pen-to-square ms-2 mt-1"></i><p className='ms-3'>Edit</p></a></li>
                                                <li><a className="dropdown-item d-flex flex-col"  onClick={()=>deletePost(postDetail._id)} ><i className="fa-solid fa-trash ms-2 mt-1"></i> <p className='ms-3'>Delete</p></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <span className='text-muted'>
                                    2 hours ago
                                </span>
                                <div><p>Lous paragraph</p></div>
                                <div className='row'>
                                    <div className='col-12 float-start mt-4'>
                                        <a className='heart' href='link'><i className="fa-regular fa-heart fs-3"></i></a>
                                        <a className='comment ms-4' href='link'><i className="fa-regular fa-comment fs-3"></i></a>
                                        <a className='share ms-4' href='link'><i className="fa-solid fa-location-arrow fs-3"></i></a>
                                    </div>
                                </div>
                                <span className='fs-5 ms-2 fw-bold likes-count p-2'>200 likes</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showPost} onHide={handlePostClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title><span className='fw-bold'>Upload Post</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <div className='col-md-12 mt-3 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}
                    <div className="row">
                        <div className='col-md-6 col- sm-12'>
                            <div className='upload-box'>
                                <div className='dropZoneContainer'>
                                    <input name="file" type='file' id='drope_zone' className='FileUpload' accept='.jpg, .png, .gif' onChange={handleFileSelect} />
                                    <div className='dropZoneOverlay'>
                                        {image.preview && <img alt='img' src={image.preview} className='drop-upload' />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form>
                            <div className='col-md-6 col-sm-12'>
                                <div className='form-floating'>
                                    <textarea onChange={(ev) => setCaption(ev.target.value)} className='form-control mt-3' placeholder='Add Caption' id='floatingTextarea' />
                                    <label for="floatingTextarea">Add Caption</label>
                                </div>
                                <div className='form-floating mt-3'>
                                    <input onChange={(ev) => setLocation(ev.target.value)} type='text' className='form-control' id="floating-input" placeholder='Add Caption'></input>
                                    <label for="floatingInput"><i className='fa-solid fa-location-pin'></i> Add Location</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => addPost()} variant="primary" className="custom-btn custom-btn-pink float-end mt-3">
                        <span className='fs-6 fw-600'>Post</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default Profile;