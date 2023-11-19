import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function CreatePost(){
    var [title, setTitle] = useState('');
    var [content, setContent] = useState('');
    var [image, setImage] = useState('');
    var navigate = useNavigate();
    
    var user = useSelector(store=>store.auth.user);

    function addPost(){
        if(user){
            axios.post('http://127.0.0.1:8000/blogapi/posts',{
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
        <div>
        <Navbar/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6 m-4  p-4 back my-5 bg-light"
                style={{borderRadius:'15px'}}>
                    <h3 className="text-center text-warning">CREATE POST</h3><hr/>
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
                        onChange={(event)=>{setContent(event.target.value)}}> 
                        </textarea>  
                    </div>
                    <div className="form-group">
                        <label>Image :</label>
                        <input type="file"
                        className="form-control"
                        value={image}
                        onChange={(event)=>{setImage(event.target.value)}}/>
                    </div><hr/>
                    <div className="form-group text-center">
                        <button className="btn btn-primary" onClick={addPost}>Submit </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default checkAuth(CreatePost);