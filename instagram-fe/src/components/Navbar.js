import React from 'react'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import './Card.css'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer);

    const logout = ()=> {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: "LOGIN_ERROR"});
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <h1 className='nav-header'>Instagram</h1>
                    <a className='nav-glass text-dark' href='link'><i className="fa-solid fa-magnifying-glass"></i></a>
                    <form className="d-flex nav-search" role="search">
                        <input className="form-control-input" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>
                    
                    <NavLink className='nav-house text-dark' to="/posts"><i className="fa-solid fa-house"></i></NavLink>
                    { localStorage.getItem("token") != null ? <NavLink className='nav-heart text-dark' href='link'><i className="fa-solid fa-heart"></i></NavLink> : '' }
                    <div className="dropdown nav-user">
                    { localStorage.getItem("token") != null ? <> <a className="profile" href="profile" role='button' data-bs-toggle="dropdown">
                            <NavLink className='text-dark'><i className="fa-solid fa-user"></i></NavLink>
                        </a> 
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="profile">
                                <NavLink className='text-dark' to="/myprofile"><i className="fa-solid fa-user"></i> My Profile</NavLink> 
                            </a></li>
                            <li><a className="dropdown-item" href="logout" >
                            <a className='text-dark' href='logout' onClick={()=>logout()}><i className="fa-solid fa-arrow-right-from-bracket" ></i> Logout</a></a></li>
                        </ul> </>: '' }
                    </div>                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar