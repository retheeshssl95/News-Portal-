import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkAuth'

function EditPost() {
    var {postId} = useParams();
    var [title, setTitle] = useState('');
    var [content, setContent] = useState('');
    var [image, setImage] = useState('');

    var user = useSelector(store=> store.auth.user);
    var navigate = useNavigate();
    
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/blogapi/posts'+postId,{
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            setTitle(response.data.title);
            setContent(response.data.content);
            setImage(response.data.image);
        })
    },[postId,user])

    function updatePost(){
        if(user){
            axios.post('http://127.0.0.1:8000/blogapi/posts'+postId,{
            title : title,
            content : content,
            image : image
        },
        {headers:{'Authorization':"Bearer "+ user.token}

        }).then(()=>{
            navigate('/dashboard')
        })
        }
    }

  return (
    <>
    <Navbar/>
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-sm-6 my-5 p-4 m-4 bg-light'
            style={{borderRadius:'15px'}}>
                <div className='form-control-sm'>
                    <h3 className='text-center text-warning'>EDIT POST</h3><hr/>
                    <div className="form-group">
                        <label>Title :</label>
                        <input type='text'
                        className="form-control"
                        value={title}
                        onChange={(event)=>{setTitle(event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label>Content :</label>
                        <textarea type='text'
                        rows='6'
                        className="form-control"
                        value={content}
                        onChange={(event)=>{setContent(event.target.value)}}/> 
                       
                    </div>
                    {/* <div className="form-group">
                        <label>Image :</label>
                        <input type="file"
                        className="form-control"
                        value={image}
                        onChange={(event)=>{setImage(event.target.value)}}/>
                    </div> */}
                    <div className='form-group'><hr/>
                        <Link to={'/dashboard'} className='btn btn-info'>Cancel</Link>
                        <button className='btn btn-warning float-right' onClick={updatePost}>Update</button> 
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default checkAuth(EditPost);
