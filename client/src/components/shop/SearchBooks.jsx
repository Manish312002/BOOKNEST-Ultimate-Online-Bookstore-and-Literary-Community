import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"



export default function SearchBooks(){
    const [books, setbooks] = useState([])
    const {name} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4000/shop/books/${name}`)
        .then((response) => setbooks(response.data))
        .catch((err) => console.log(err))
    },[])

    
    return(
        <>
        <div className="mt-28 px-4 lg:px-24">
          <h2 className="text-5xl font-bold text-center">Search Books</h2>

          <div className="grid gap-8 my-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {books.length > 0 ? (
              books.map((book) => (
                <Link key={book.id} to={`/book/${book.id}`} className="block">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                    <img 
                      src={book.imgpath} 
                      alt={`Cover of ${book.title}`} 
                      className="h-96 w-full object-cover" 
                    />
                    <div className="p-4">
                      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white h-[60px]">
                        {book.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {book.author}
                      </p>
                      <h5 className="text-lg font-semibold text-blue-500 mt-2">
                        ${book.price}
                      </h5>
                      <button 
                        onClick={() => handleBuyNow(book.id)} // Add your buy logic here
                        className="mt-4 w-full bg-blue-700 hover:bg-blue-800 font-semibold text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                        aria-label={`Buy ${book.title} now`}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No books available at the moment.</p>
            )}
          </div>
        </div>

        </>
    )
}