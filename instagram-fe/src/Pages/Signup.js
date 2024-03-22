import './Login.css'
import socialImg from '../Images/instagram1.jpg'
import { Link } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'
import {API_BASE_URL} from '../config'
import Swal from "sweetalert2"

const Signup = ()=>{
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);


    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { fullName: fullName, email, phone, password}
        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((result)=>{
                if (result.status === 201){
                    setLoading(false);
                    Swal.fire({
                    icon: "success",
                    title: "User Successfully Signup"
                })
            }
            setFullName('');
            setEmail('');
            setPhone('');
            setPassword('');
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Some error occur please try again later"
            })
        })
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <img src={socialImg} alt="" className="instagram1" />
                </div>
                <div className="col-md-7">
                    <div className="card shadow">
                        <div className="card-body">
                           { loading ? <div className="col-md-12 mt-2 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
                            <h4 className="card-title text-center">Signup</h4>
                            <form onSubmit={(ev)=>signup(ev)}>
                                <div className='mb-3 mt-3'>
                                    <input type="Email" value={email} onChange={(ev) => setEmail(ev.target.value)} className='form-control' placeholder='Email' />
                                </div>
                                <div className='mb-3 mt-3'>
                                    <input type="Phone Number" value={phone}  onChange={(ev) => setPhone(ev.target.value)} className='form-control' placeholder='Phone Number' />
                                </div>
                                <div className='mb-3 mt-3'>
                                    <input type="Fullname" value={fullName} onChange={(ev) => setFullName(ev.target.value)} className='form-control' placeholder='Fullname' />
                                </div>
                                <div className='mb-3'>
                                    <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className='form-control' placeholder='Password' />
                                </div>
                                <button type="submit" className='btn btn-primary btn-signup  border-radius-3'>Signup</button>
                                <div className='mt-3 text-center'>
                                    <span className="text-muted">Have an Account?</span>
                                    <Link to='/login' className="login-text ms-1 text-muted fw-bold">Login here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;