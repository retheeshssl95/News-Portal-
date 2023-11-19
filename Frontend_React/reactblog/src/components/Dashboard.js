import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './dashboard.css';
import checkAuth from './auth/checkAuth';


function Dashboard() {
    var [posts, setPosts]=useState([]);
    function fetchPosts(){
        axios.get('https://demo-blog.mashupstack.com/api/posts/').then(response=>{
            setPosts(response.data)
        })

    }
    useEffect(()=>{
        fetchPosts()
    },[])

  return (
    <div>
      <div className="container-fluid">
            <div className="row ">
                <div className="col-sm-2 bg-secondary" style={{height:'739px', background:'gainsboro', display:'block'}}> 
                    <img className=" rounded-circle mr-3" id="profile" src="" alt="svg"/>
                    <h1 className="profile-name"><strong>My Name</strong></h1><hr/>


                    <Link to={'/post/create'} className="btn btn-outline-primary btn-block"><strong>CREATE POST</strong></Link>
                    <nav className="navbar-expand-sm nav-menu">
                    <ul className="navbar-nav flex-sm-column bg-secondary">
                        <li className="nav-item text center">
                            <Link  to= '/' className="logout nav-link btn btn-danger mb-2"
                        type="submit" style={{borderRadius:'5px'}}><strong>Go Home</strong></Link>          
                        </li>
                        
                    </ul>
                    </nav>
                </div>


                <div className="col-sm-10" style={{padding:'0px'}}>
                    <nav className="navbar navbar-expand-lg bg-dark" >
                        <div className="container-fluid">
                        <h2 className="text-white"> <strong>DASHBOARD</strong></h2>

                        <form action="{% url 'filter' %}" method="get" className="form-inline my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="searchbar" style={{borderRadius:'20px'}}/>
                        <button className="btn btn-outline-success my-sm-0" type="submit" style={{borderRadius:'20px'}}>Search</button>
                        </form>
                        </div>
                    </nav>
                
                    <div>
                    <ul className = "breadcrumb justify-content-end">
                        <li className = "breadcrumb-item"><Link to = {'/posts'}><strong>News</strong></Link></li>
                        <li className = "breadcrumb-item active" aria-current = "page"><strong>Dashboard</strong></li>
                    </ul>
                    </div>
            
                    <div className="col-sm-12 mt-md-0">      
                    <table className="table table-hover">
                        <thead className="thead">
                        <tr>
                            <th className="align-middle">Sl.no</th>
                            <th className="align-middle">Image</th>
                            <th className="align-middle">Name</th>
                            <th className="align-middle">Created On</th>
                            <th className="align-middle">Last Updated</th>
                            <th className="align-middle">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map(post =>(
                        <tr key={post.id}>
                            <th className="align-middle"> { post.id} </th>
                            <td className="align-middle"> IMAGE </td>
                            <td className="align-middle table-title"> &nbsp; { post.title}</td>
                            <td className="align-middle"><span>{ post.created_on } </span></td>
                            <td className="align-middle"><span>{ post.updated_on }</span></td>
                            <td className="align-middle">
                                <Link to={'/post/'+ post.id +'/edit'}  className=" btn btn-success mr-2 mt-1"><i className="far fa-edit"></i></Link>
                                <Link to={'/post/'+ post.id +'/delete'} className=' btn btn-danger mt-1'><i className="far fa-trash-alt"></i></Link> 
                            </td>  
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default checkAuth(Dashboard)
