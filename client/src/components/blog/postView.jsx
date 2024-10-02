

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export default function PostView(){
    const [idPost, setidPost] = useState('')
    const {id} = useParams()
    
    useEffect(() =>{
        axios.get(`http://localhost:4000/blog/post/${id}`,{withCredentials:true})
        .then(response => setidPost(response.data))
        .catch(error => {console.error('Error fetching Post :', error)
    })
    },[])
    
    return(
        <>
    <div className="px-4 lg:px-24 mt-16">
        <div className="mt-10 mb-6">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2 transition-transform transform hover:scale-105">
                {idPost.title}
            </h1>
            <div className="publish-date text-gray-600 flex space-x-4">
                <span className="post-author font-semibold italic text-blue-700">{idPost.author}</span>
                <span className="post-date text-gray-500">{idPost.publish_date}</span>
                <span className="post-type bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-sm font-medium shadow">
                    {idPost.contenttype}
                </span>
            </div>
        </div>

        <div className="main-body">
            <div className="cover-img mb-8">
                <img 
                    className="w-9/12 h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 mx-auto" 
                    src={"http://localhost:4000/" + idPost.filepath} 
                    alt={idPost.filepath} 
                />
            </div>
            <div className="post-content bg-white p-8 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                <div className="prose lg:prose-xl max-w-none text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: idPost.content }} />
                </div>
                <p className="mt-4 text-gray-700 text-lg italic border-l-4 border-blue-500 pl-4">
                    {idPost.summary}
                </p>
                
            </div>
        </div>
    </div>
</>

    
    
    )
}