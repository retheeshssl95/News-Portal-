import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import './blog.css';
import Footer from "../Footer";
import checkAuth from "../auth/checkAuth";

function ListPost() {
    var user = useSelector(store=>store.auth.user)
    var [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/blogapi/posts',{
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            setPosts(response.data)
        })
    },[user])

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col my-2">
                    <h1 className=" text-center"><strong>BLOG</strong></h1> <hr/>
                    {posts.length === 0 ? (
                            <p className="alert alert-info text-center">No Result Found</p>
                        ): (
                    <div>
                    {posts.map(post =>(
                    <div className="card" key={post.id}>
                        <img className="card-img-top" src="#" alt="Card-img"/>
                        <div className="card-body">
                        <span className="card-title"><strong>{post.title}</strong></span>
                        <p className="subtitle">{post.author} | {post.created_on}</p>
                        <p className="card-text">{''}</p>
                        <span style={{color:'green'}}> Read more ..</span>
                        <Link to={'/post/'+ post.id} className="stretched-link"></Link>  
                        </div>
                    </div>
                    ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default checkAuth(ListPost); 