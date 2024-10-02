
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {} from 'react-icons'
import { Avatar } from "flowbite-react";
import profile from '../../assets/profile.jpeg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Reviews.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

export default function Reviews(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:4000/reviews');
                setData(response.data);

            } catch (error) {
                console.error("Failed to fetch reviews", error);
            }
        };

        fetchReviews();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar key={index} color={index < rating ? "gold" : "lightgray"} />
        ));
    };

    return(
        <>
            <div className="my-12 px-4 lg:px-24">
                <h2 className="text-5xl font-bold text-center mb-10 leading-snug">OUR CUSTOMERS</h2>

                <div>
                    <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        },
                        768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                        },
                        1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    >
                    {data.length > 0 ? (
                        data.map(dt => (
                        <SwiperSlide key={dt.id} className="shadow-lg bg-white py-6 px-4 md:m-6 rounded-lg border border-gray-200 transition-transform transform hover:scale-105">
                            <div className="space-y-4 h-[350px]">
                            <div className="text-amber-500 flex items-center gap-2">
                                {renderStars(dt.rating)}
                            </div>
                            <div className="text-start">
                                <h3 className="text-base mb-1 font-bold text-gray-900">{dt.title}</h3>
                                <p className="mb-4 text-sm text-gray-700">{dt.feedback}</p>
                                <div className="flex items-center mb-2">
                                <Avatar img={profile} alt={`Avatar of ${dt.username}`} rounded className="w-10 h-10" />
                                <div className="ml-3">
                                    <h5 className="text-lg font-semibold text-gray-800">{dt.username}</h5>
                                </div>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm font-medium text-gray-600">Book Details</p>
                                <h4 className="text-base font-semibold text-gray-800">{dt.booktitle}</h4>
                                <p className="text-sm text-gray-600">{dt.author}</p>
                                </div>
                            </div>
                            </div>
                        </SwiperSlide>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-full p-6 bg-gray-100 rounded-lg">
                        <p className="text-gray-500 text-lg">No reviews available.</p>
                        </div>
                    )}
                    </Swiper>
                </div>
            </div>

        </>
    )
}