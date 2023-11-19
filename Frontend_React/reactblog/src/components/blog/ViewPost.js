import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import checkAuth from '../auth/checkAuth'

function ViewPost() {
  var {postId} = useParams()
  var [post, setPost] = useState({title:'', content:'', image:''})
  var user = useSelector(store=> store.auth.user)

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/blogapi/posts'+postId,{
      headers:{'Authorization':"Bearer "+ user.token}
    }).then(response=>{
      setPost(response.data)
    })
  },[postId, user])
  
  return (
    <>
      <Navbar/>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col'>
            <img src="{post.imag}" alt="profile-img"  style={{height: '600px', width: '100%', borderRadius:'10px'}}/>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-content">{post.content}</p><hr/> 
          </div>
        </div>
      </div>
      
    </>
  )
}

export default checkAuth(ViewPost);
