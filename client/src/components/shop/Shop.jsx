import axios from "axios"
import { useEffect, useState } from "react"
import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";



export default function Shop(){
    const navigate = useNavigate()
    const [books, setbooks] = useState([])
    const [buybook, setbuybook] = useState({})
    
    useEffect(() => {
        axios.get('http://localhost:4000/all_books')
        .then((response) => (setbooks(response.data)))
        .catch((err) =>(console.log(err)))
    },[])

    const handlebuynow = async(id) =>{
      try {
        const bk = await axios.get(`http://localhost:4000/book/${id}`);
        const bookData = bk.data[0]; 

        const response = await axios.post('http://localhost:4000/shop/cart', bookData, { withCredentials: true });

        if (response.status === 200) {
            setbuybook(null); 
            navigate('/shop/cart'); 
        }
        
    } catch (error) {
      navigate('/login')
    }
    }



    
    return(
        <>
          <div className="mt-28 px-4 lg:px-24">
              <h2 className="text-5xl font-bold text-center">All Books are here</h2>

              <div className="grid gap-8 my-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                
                {books.map((book) => (

                <div key={book.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                  <Link to={`/book/${book.id}`} className="block">
                    <img 
                      src={book.imgpath} 
                      alt={book.title} 
                      className="h-96 w-full object-cover transition-transform duration-200 hover:scale-105" 
                    />
                    <div className="p-4">
                      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white h-[60px] transition duration-200 hover:text-blue-500">
                        {book.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {book.author}
                      </p>
                      <h5 className="text-lg font-semibold text-blue-500 mt-2">
                        ${book.price}
                      </h5>
                    </div>
                  </Link>
                  <button 
                    onClick={() => handlebuynow(book.id)} 
                    className="mb-4 w-full bg-blue-700 hover:bg-blue-800 font-semibold text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
                  >
                    Buy Now
                  </button>
                </div>

              
                ))}
                
              </div>



          </div>
        </>
    )
}