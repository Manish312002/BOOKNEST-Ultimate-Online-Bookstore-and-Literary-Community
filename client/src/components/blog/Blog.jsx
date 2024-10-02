import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Blog(){
    const [posts, setposts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/posts',)
        .then((response) => setposts(response.data))
        .catch((err) => console.log(err))
    },[])

    return(
        <>
        <div className="my-16 px-4 lg:px-24">
        <h2 className="text-4xl font-bold text-center mt-5 mb-8 text-blue-800 border-b-2 border-blue-300 pb-2">
            Latest Posts from BookStore-Blog
    </h2>

            {posts.map(post => (
            <div key={post.id} className="flex flex-col lg:flex-row max-w-full rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-50 duration-300 mb-6">
                
                <div className="flex-shrink-0 w-full lg:w-1/3">
                <Link to={`/blog/post/${post.id}`} className="block">
                    <img 
                    src={`http://localhost:4000/${post.filepath}`} 
                    alt={`Image for ${post.title}`} 
                    className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105" 
                    />
                </Link>
                </div>
                
                <div className="p-6 w-full lg:w-2/3 flex flex-col justify-between h-full">
                <div>
                    <Link to={`/blog/post/${post.id}`}>
                    <h2 className="font-bold text-2xl mb-2 text-gray-800 hover:text-blue-600 transition-colors">{post.title}</h2>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">
                    <Link to={`/author/${post.author}`} className="author hover:text-blue-500">{post.author}</Link>
                    <time className="ml-2 text-gray-500">{post.publish_date}</time>
                    <span className="ml-2 text-gray-500">{post.contenttype}</span>
                    </p>
                </div>
                <p className="summary text-gray-700 mb-4">
                    {post.summary.length > 300 ? `${post.summary.substring(0, 300)}...` : post.summary}
                    <Link to={`/blog/post/${post.id}`} className="text-gray-500 font-semibold hover:text-blue-600"> Read More</Link>
                </p>
                </div>

            </div>
            ))}
        </div>
        </>
    )
}