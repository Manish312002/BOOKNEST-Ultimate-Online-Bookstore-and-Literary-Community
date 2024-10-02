import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { FaStar } from 'react-icons/fa6';
import axios from 'axios';

export default function Book() {
  const navigate = useNavigate()
  const { data } = useLoaderData();
  const book = data[0]; 
  const descriptions = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [char, setchar] = useState(0)

  const handlebuynow = async(e) =>{
    e.preventDefault()

    try{
      await axios.post('http://localhost:4000/shop/cart',book, {withCredentials:true})
      navigate('/shop/cart')
    }catch(err){
      navigate('/login')
    }

  }

  const handleReview = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('booktitle', book.title);
    formData.set('bookauthor', book.author);
    formData.set('id',book.id)

    const data = {}

    formData.forEach((value,key) => {
      data[key] = value
    })

    try {
      const response =await axios.post('http://localhost:4000/review', data,{withCredentials:true})
        e.target.reset()
    } catch (err) {
        navigate('/login')
    }

  };

  const handlechange = (e) => {
    setchar(e.target.value)
  }

  const remainingChar = 300 - char.length

  return (
    <>
      <div className="flex flex-col w-full max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 my-10 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 transition-transform duration-500 transform hover:scale-110 relative">
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text hover:text-blue-600">
              {book.title}
            </span>
            <span className="absolute inset-0 opacity-30 blur-md rounded-md transform scale-110"></span>
            <span className="absolute inset-0 shadow-lg rounded-md opacity-50 transform scale-100 transition duration-500 hover:scale-110"></span>
          </h1>
        </div>

        <div className="flex justify-center mb-8">
          <img 
            alt={book.name} 
            src={book.imgpath} 
            className="max-h-96 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-3 hover:opacity-90" 
          />
        </div>

        <section aria-labelledby="information-heading" className="mb-8">
          <h2 id="information-heading" className="text-3xl font-semibold text-gray-700 hover:text-blue-600 transition duration-300">Book Information</h2>
          <div className="mt-2">
            <p className="text-2xl font-bold text-green-600 hover:text-green-700 transition duration-300">${book.price}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold hover:text-blue-600 transition duration-300">Reviews</h3>
            <div className="flex items-center">
              {[...Array(4)].map((_, index) => (
                <FaStar key={index} className="w-4 h-4 text-yellow-500 transition-transform duration-300 transform hover:scale-110" />
              ))}
              <p className="ml-2 text-gray-700 hover:text-blue-600 transition duration-300">4 out of 5 stars</p>
            </div>
            <p className="text-sm text-gray-500">1624 reviews</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 hover:text-gray-700 transition duration-300">{book.description}</p>
          </div>
          <div className="mt-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 transition-transform duration-300 transform hover:scale-110">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
            </svg>
            <p className="ml-2 text-gray-600 hover:text-gray-700 transition duration-300">In stock and ready to ship</p>
          </div>
        </section>
        
        <section aria-labelledby="options-heading">
          <h2 id="options-heading" className="text-3xl font-semibold text-gray-700 hover:text-blue-600 transition duration-300">Book Options</h2>
          <form onSubmit={handlebuynow} className="mt-4">
            <div className="mt-4">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-500 transform hover:scale-105 transition duration-300"
              >
                Buy Now
              </button>
            </div>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 hover:underline hover:text-blue-500 transition duration-300">
                Lifetime Guarantee
              </a>
            </div>
          </form>
        </section>

        {/* Review Form */}
        <div className='flex flex-col w-full max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 my-10 pb-10'>
          <form onSubmit={handleReview} className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="review-text" value="Feedback" />
              </div>
              <Textarea
                id="review-text"
                rows={4}
                name='feedback'
                placeholder="Write your feedback"
                maxLength={300}
                onChange={handlechange}
                required
              />
              <div className="text-gray-600 text-end">
                Remaining characters: {remainingChar ? remainingChar : 300}
              </div>
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label value="Rating" />
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating${star}`}
                      name="rating"
                      className="hidden"
                      required
                      value={star}
                      onChange={() => setRating(star)}
                      aria-labelledby={`label${star}`}
                    />
                    <Label
                      id={`label${star}`}
                      htmlFor={`rating${star}`}
                      className={`cursor-pointer text-gray-400 hover:text-yellow-400 ${rating >= star ? 'text-yellow-400' : ''} ${hoverRating >= star ? 'text-yellow-400' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-hidden="true"
                    >
                      <FaStar />
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-gray-600">
                {(rating > 0) && (
                  <span>
                    You rated this: {descriptions[hoverRating > 0 ? hoverRating : rating]}.
                  </span>
                )}
              </div>
            </div>

            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      </div>

    </>
  );
}
