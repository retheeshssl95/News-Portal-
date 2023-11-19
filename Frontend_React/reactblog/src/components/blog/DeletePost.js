import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkAuth';

function DeletePost() {
    var {postId} = useParams();
    var navigate = useNavigate();
    var user = useSelector(store=>store.auth.user)

    function deletePost() {
        axios.delete('http://127.0.0.1:8000/blogapi/posts'+postId,{
            headers: {'Authorization':"Bearer "+user.token}
        }).then(()=>{
            navigate('/dashboard')
        })
    }
  return (
    <div>
    <Navbar/>
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm-5 my-5 m-4'>
          <div className='card'>
            <div className=' text-center alert alert-danger'>
              <h3>Delete</h3>
            </div>
            <div className='card-body '>
              <p className='text-center'>Are you sure you want to Delete ?</p><hr/>
              <button className='btn btn-danger float-right' onClick={deletePost}>Yes,Delete</button>
              <Link to={'/dashboard'} className='btn btn-info'>Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </div> 
    </div>
   
  )
}

export default checkAuth(DeletePost);
