import { useEffect, useState } from "react"
import axios from "axios"



export default function DashBoard() {
    const [books, setbooks] = useState([])
    const [users, setusers] = useState([])
    const [posts, setposts] = useState([])


    useEffect(() => {
        axios.get('http://localhost:4000/all_books')
        .then((response) => (setbooks(response.data)))
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        axios.get('http://localhost:4000/all_users',{withCredentials:true})
        .then((response) => (setusers(response.data)))
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        axios.get('http://localhost:4000/posts',{withCredentials:true})
        .then((response) => setposts(response.data))
        .catch((err) => console.log(err))
    },[])

    
    return(
        <>
        <div className="flex flex-col h-screen w-9/12">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl">Bookstore Dashboard</h1>
            </header>
            <div className="flex flex-1">
                <main className="flex-1 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Books</h2>
                            <p className="text-3xl">{books.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Posts</h2>
                            <p className="text-3xl">{posts.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="text-3xl">{users.length}</p>
                        </div>
                    </div>

                    
                    <div className="mt-2 mb-2">
                    <h2 className="text-xl mt-6 mb-4">Latest Books</h2>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Author</th>
                                <th className="border px-4 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>

                            {books.slice(0,5).map(book => (
                            <tr key={book.id}>
                                <td className="border px-4 py-2">{book.title}</td>
                                <td className="border px-4 py-2">{book.author}</td>
                                <td className="border px-4 py-2">${book.price}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>


                    <div className="mt-2 mb-2">
                    <h2 className="text-xl mt-6 mb-4">Latest Posts</h2>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Author</th>
                                <th className="border px-4 py-2">Genre</th>
                                <th className="border px-4 py-2">DateTime</th>
                            </tr>
                        </thead>
                        <tbody>

                            {posts.slice(0,5).map(post => (
                            <tr key={post.id}>
                                <td className="border px-4 py-2">{post.title}</td>
                                <td className="border px-4 py-2">{post.author}</td>
                                <td className="border px-4 py-2">{post.contenttype}</td>
                                <td className="border px-4 py-2">{post.publish_date}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}


