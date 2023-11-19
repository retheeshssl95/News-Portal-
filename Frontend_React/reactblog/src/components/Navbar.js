import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../store/authSlice';

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout(){
        if(user){
            axios.post('http://127.0.0.1:8000/blogapi/logout',{},{
               headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-dark bg-success ">
        <div className="navbar-brand">
            <h1><strong><span className='text-dark'>NE<i className='text-danger'>W</i>S</span> PORTAL</strong></h1>
        </div>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse mr-auto" id="navbarNav">
            <ul className="navbar-nav">  
            {user?
                <li className="nav-item active">
                    <NavLink to={"/dashboard"} className={'nav-link'}><strong>Dashboard</strong></NavLink>
                </li>:
                <li className="nav-item">
                    <NavLink to={"/"} className={'nav-link'}><strong>Home</strong></NavLink>
                </li>
                }

                {user?
                <li className="nav-item">
                <NavLink to={"/posts"} className={'nav-link'}><strong>News</strong></NavLink>
                 </li>:
                <li className="nav-item">
                    <NavLink to={"/register"} className={'nav-link'}><strong>Register</strong></NavLink>
                </li>
                } 

                
            
                {user?
                <li className="nav-item">
                    <span><strong>{user.username}</strong></span>
                    <span className='nav-link' onClick={logout}><strong>Logout</strong></span>
                </li>:
                <li className="nav-item">
                    <NavLink to={"/login"} className={'nav-link'}>Login</NavLink>
                </li>
                }
            
            </ul>
        </div>
        
        <div className="container-fluid justify-content-end">
          <form action="" method="get" className="form-inline my-lg-0">
            <input className="form-control search-item mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="searchbar"/>
            <button className="btn btn-outline-light my-sm-0 mr-0 search-item"  type="submit"><strong>Search</strong></button>
          </form>        
        </div>
    </nav>      
    </>
  )
}

export default Navbar
