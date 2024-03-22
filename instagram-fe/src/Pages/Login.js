import './Login.css'
import socialImg from "../Images/instagram1.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const requestData = { email: email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status === 200) {
                    setLoading(false);
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/posts');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: error.response.data.error
                })
            })

    }

    return(
         
        <div className="container">
        <div className="row">
            <div className="col-md-5">
                <img src={socialImg} alt="" className="instagram1" />
            </div>
            <div className="col-md-7">
                <div className="card shadow ">
                    <div className="card-body ">
                        {loading ? <div className="col-md-12 mt-2 text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                        <h4 className="card-title text-center">Login</h4>
                        <form onSubmit={(ev) => login(ev)}>
                            <div className='mb-3 mt-3'>
                                <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className='form-control' placeholder='   Email' />
                            </div>
                            <div className='mb-3'> 
                                <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className='form-control' placeholder='Password' />
                            </div>
                            <button type="submit" className='btn btn-primary btn-login border-radius-3 '>Login</button>
                            <div className='mt-3 text-center'>
                                <span className="text-muted">Don't have an Account?</span>
                                <Link to="/signup" className="ms-1 text-muted fw-bold">Signup here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}

export default Login;