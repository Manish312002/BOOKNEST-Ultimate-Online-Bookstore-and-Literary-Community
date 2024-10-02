import {createBrowserRouter} from "react-router-dom";
import axios from "axios";
import App from "./App";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Shop from "./components/shop/Shop";
import Book from "./components/home/SingleBook";
import DashBoardLayout from "./components/DashBoard/DashBoardLayout";
import UploadBook from "./components/DashBoard/UploadBook";
import ManageBooks from "./components/DashBoard/ManageBooks";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/DashBoard/Logout";
import Update from "./components/DashBoard/Update";
import Profile from "./components/DashBoard/Profile";
import CreatePost from "./components/blog/CreatePost";
import DashBoard from "./components/DashBoard/DashBoard";
import PostView from "./components/blog/postView";
import ManagePosts from "./components/DashBoard/ManagePosts";
import UpdatePost from "./components/DashBoard/UpdatePost";
import SearchBooks from "./components/shop/SearchBooks";
import Cart from "./components/shop/Cart";



const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/about',
          element:<About />
        },
        {
          path:'/blog',
          element:<Blog />
        },
        {
          path:'/blog/post/:id',
          element:<PostView />
        },
        {
          path:'/shop',
          element:<Shop />
        }, 
        {
          path:'/shop/cart',
          element:<Cart />
        }, 
        {
          path:'/shop/books/:name',
          element:<SearchBooks />
        }, 
        {
          path:'/login',
          element:<Login />
        }, 
        {
          path:'/register',
          element:<Register />
        }, 
        {
          path:'/book/:id',
          element:<Book />,
          loader: async({params}) => await axios.get(`http://localhost:4000/book/${params.id}`)
        },
      ]
    },
    {
      path: '/dashboard',
      element: <DashBoardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <DashBoard />
        },
        {
          path: '/dashboard/upload',
          element: <UploadBook />
        },
        {
          path: '/dashboard/manage',
          element: <ManageBooks />
        },
        {
          path: '/dashboard/profile',
          element: <Profile />
        },
        {
          path: '/dashboard/logout',
          element: <Logout />
        },
        {
          path: '/dashboard/upload_post',
          element: <CreatePost />
        },
        {
          path: '/dashboard/manage_posts',
          element: <ManagePosts />
        },
        {
          path: '/dashboard/edit/post/:id',
          element: <UpdatePost />,
          loader: async({params}) => await axios.get(`http://localhost:4000/blog/post/${params.id}`)
        },
        {
          path: '/dashboard/edit/book/:id',
          element: <Update />,
          loader: async({params}) => await axios.get(`http://localhost:4000/book/${params.id}`)
        },
        
      ]

    }
]);

export default Router