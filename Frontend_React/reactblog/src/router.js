import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/ViewPost";
import EditPost from "./components/blog/EditPost";
import DeletePost from "./components/blog/DeletePost";
import ListPost from "./components/blog/ListPost";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
    {path:'', element: <App/>},
    {path:'register', element:<Register/>},
    {path:'login', element:<Login/>},
    {path:'posts', element:<ListPost/>},
    {path:'post/create', element:<CreatePost/>},
    {path:'post/:postId', element:<ViewPost/>},
    {path:'post/:postId/edit', element:<EditPost/>},
    {path:'post/:postId/delete', element:<DeletePost/>},
    {path:'dashboard', element:<Dashboard/>}

]);

export default router;


//  Django - Blog Project URL
// http://127.0.0.1:8000/blogapi/register
// http://127.0.0.1:8000/blogapi/login
// http://127.0.0.1:8000/blogapi/logout
// http://127.0.0.1:8000/blogapi/posts
// http://127.0.0.1:8000/blogapi/comment/1


// Todo Project URL
// https://demo-blog.mashupstack.com/api/register
// https://demo-blog.mashupstack.com/api/login
// https://demo-blog.mashupstack.com/api/logout
// https://demo-blog.mashupstack.com/api/posts/