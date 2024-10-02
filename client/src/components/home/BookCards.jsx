import { useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../home/BookCards.css'

// import required modules
import { Pagination } from 'swiper/modules';




export default function BookCards({books, headline}) {
  const [buybook, setbuybook] = useState({})
  const navigate = useNavigate()

  const handlebuynow = async(id) =>{
    try {
      const bk = await axios.get(`http://localhost:4000/book/${id}`);
      const bookData = bk.data[0]; 

      const response = await axios.post('http://localhost:4000/shop/cart', bookData, { withCredentials: true });

      if (response.status === 200) {
          setbuybook(null); 
          navigate('/shop/cart', replace); 
      }
  } catch (error) {
        navigate('/login')
  }
  }

  return (
    <>
      <div className='my-16 px-4 lg:px-24'>
        <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
        
        <div className='mt-12'>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper w-full"
            >
                {books.map(book => (
                    <SwiperSlide key={book.id} className='pb-6'>
                        <div className='relative group'>
                            <Link to={`/book/${book.id}`}>
                                <div className='overflow-hidden rounded-lg shadow-md'>
                                    <img 
                                        src={book.imgpath} 
                                        alt={book.title} 
                                        className='w-full h-auto transition-transform duration-300 group-hover:scale-105'
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h4 className='font-bold text-base'>{book.title}</h4>
                                    <p className='text-sm text-gray-600'>{book.author}</p>
                                </div>
                                <div className='mt-1'>
                                    <p className='font-medium text-blue-600'>${book.price}</p>
                                </div>
                            </Link>
                            <button 
                                onClick={() => handlebuynow(book.id)} 
                                className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded-full transition duration-200'
                            >
                                <FaShoppingCart className='w-4 h-4 text-white' />
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
      </div>

    </>
  );
}
